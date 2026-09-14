#!/usr/bin/env node
// Runs the full Vitest suite (both the `server` and `storybook` projects,
// see vitest.config.ts) with the JSON reporter, then renders the results as
// a static HTML report at public/test-report.html.
//
// Usage: node scripts/generate-test-report.mjs   (or `npm run test:report`)

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
// Kept in the repo root (gitignored, see .gitignore) rather than an OS temp
// dir: Vitest itself prints "JSON report written to <path>", which editor
// terminals turn into a clickable link — deleting the file right after
// reading it made that link 404. Leaving it in place, overwritten each run,
// also makes the raw results inspectable if you want more than the HTML.
const jsonPath = path.join(repoRoot, ".vitest-report.json");

console.log("Running `vitest run --reporter=json` …");
try {
  execFileSync(
    "npx",
    ["vitest", "run", "--reporter=json", `--outputFile=${jsonPath}`],
    { cwd: repoRoot, stdio: "inherit" }
  );
} catch {
  // vitest exits non-zero when any test fails — we still want to render the
  // report in that case, so only bail if the JSON file was never written.
}

const results = JSON.parse(readFileSync(jsonPath, "utf8"));

function suiteFor(filePath) {
  const rel = path.relative(repoRoot, filePath);
  if (rel.startsWith("lib/") || rel.startsWith("app/api/")) return "Backend (unit + integration)";
  if (rel.includes(".stories.")) return "Storybook (components)";
  return "Other";
}

function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

const files = results.testResults.map((tr) => ({
  path: path.relative(repoRoot, tr.name),
  suite: suiteFor(tr.name),
  status: tr.status,
  tests: tr.assertionResults.map((a) => ({
    title: a.ancestorTitles.length ? `${a.ancestorTitles.join(" > ")} > ${a.title}` : a.title,
    status: a.status,
    duration: a.duration ?? 0,
    failureMessages: a.failureMessages ?? [],
  })),
}));

const bySuite = new Map();
for (const f of files) {
  if (!bySuite.has(f.suite)) bySuite.set(f.suite, []);
  bySuite.get(f.suite).push(f);
}

const totalTests = results.numTotalTests;
const passedTests = results.numPassedTests;
const failedTests = results.numFailedTests;
const totalFiles = results.testResults.length;
const passedFiles = results.testResults.filter((t) => t.status === "passed").length;
const generatedAt = new Date().toISOString();
const allPassed = failedTests === 0;

function renderFile(f) {
  const rows = f.tests
    .map(
      (t) => `
      <tr class="${t.status === "passed" ? "ok" : "fail"}">
        <td>${t.status === "passed" ? "✅" : "❌"}</td>
        <td>${escapeHtml(t.title)}</td>
        <td class="dur">${t.duration.toFixed(0)} ms</td>
      </tr>
      ${
        t.failureMessages.length
          ? `<tr class="fail-detail"><td></td><td colspan="2"><pre>${escapeHtml(t.failureMessages.join("\n"))}</pre></td></tr>`
          : ""
      }`
    )
    .join("");

  return `
  <details class="file-card" ${f.status === "passed" ? "" : "open"}>
    <summary>
      <span class="badge ${f.status === "passed" ? "badge-ok" : "badge-fail"}">${f.status}</span>
      <code>${escapeHtml(f.path)}</code>
      <span class="count">${f.tests.length} test${f.tests.length === 1 ? "" : "s"}</span>
    </summary>
    <table>
      <tbody>${rows}</tbody>
    </table>
  </details>`;
}

function renderSuite(name, suiteFiles) {
  const passed = suiteFiles.filter((f) => f.status === "passed").length;
  return `
  <section>
    <h2>${escapeHtml(name)} <span class="suite-count">${passed}/${suiteFiles.length} files passed</span></h2>
    ${suiteFiles.map(renderFile).join("\n")}
  </section>`;
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Farmart Test Report</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #fafafa;
    color: #28374b;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 14px;
  }
  header {
    border-bottom: 1px solid #eeeeee;
    background: #fff;
    padding: 20px 24px;
  }
  header h1 { margin: 0 0 4px; font-size: 18px; }
  header p { margin: 0; font-size: 12px; color: #8a8f98; }
  main { max-width: 1000px; margin: 0 auto; padding: 24px; }

  .summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    margin-bottom: 28px;
  }
  .summary .stat {
    background: #fff;
    border: 1px solid #eeeeee;
    border-radius: 8px;
    padding: 14px 16px;
  }
  .summary .stat .value { font-size: 22px; font-weight: 700; }
  .summary .stat .label { font-size: 11px; color: #8a8f98; text-transform: uppercase; letter-spacing: 0.04em; }
  .summary .stat.pass .value { color: #2e9e5b; }
  .summary .stat.fail .value { color: #e74c3c; }
  .overall {
    display: inline-block;
    margin-bottom: 20px;
    padding: 6px 14px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 12px;
  }
  .overall.ok { background: #e7f7ee; color: #2e9e5b; }
  .overall.bad { background: #fdecea; color: #e74c3c; }

  section { margin-bottom: 28px; }
  section h2 {
    font-size: 14px;
    margin: 0 0 10px;
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .suite-count { font-size: 11px; color: #8a8f98; font-weight: 400; }

  .file-card {
    background: #fff;
    border: 1px solid #eeeeee;
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .file-card summary {
    cursor: pointer;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    list-style: none;
  }
  .file-card summary::-webkit-details-marker { display: none; }
  .file-card summary code { font-size: 12px; }
  .file-card summary .count { margin-left: auto; font-size: 11px; color: #8a8f98; }

  .badge {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 3px;
  }
  .badge-ok { background: #e7f7ee; color: #2e9e5b; }
  .badge-fail { background: #fdecea; color: #e74c3c; }

  table { width: 100%; border-collapse: collapse; border-top: 1px solid #f2f2f2; }
  tr.ok td:first-child, tr.fail td:first-child { width: 24px; text-align: center; }
  td { padding: 6px 14px; font-size: 12px; border-bottom: 1px solid #f7f7f7; }
  td.dur { text-align: right; color: #8a8f98; white-space: nowrap; }
  tr.fail-detail pre {
    margin: 0 0 8px;
    padding: 8px 10px;
    background: #fdecea;
    color: #b3261e;
    border-radius: 4px;
    font-size: 11px;
    white-space: pre-wrap;
  }
</style>
</head>
<body>
<header>
  <h1>🧪 Farmart — Test Report</h1>
  <p>Generated ${generatedAt} · vitest (server + storybook projects)</p>
</header>
<main>
  <span class="overall ${allPassed ? "ok" : "bad"}">${allPassed ? "ALL TESTS PASSED" : `${failedTests} TEST(S) FAILED`}</span>

  <div class="summary">
    <div class="stat"><div class="value">${totalFiles}</div><div class="label">Test files</div></div>
    <div class="stat pass"><div class="value">${passedFiles}</div><div class="label">Files passed</div></div>
    <div class="stat"><div class="value">${totalTests}</div><div class="label">Tests</div></div>
    <div class="stat pass"><div class="value">${passedTests}</div><div class="label">Passed</div></div>
    <div class="stat fail"><div class="value">${failedTests}</div><div class="label">Failed</div></div>
  </div>

  ${[...bySuite.entries()].map(([name, suiteFiles]) => renderSuite(name, suiteFiles)).join("\n")}
</main>
</body>
</html>
`;

const outPath = path.join(repoRoot, "public", "test-report.html");
writeFileSync(outPath, html);
console.log(`\nWrote ${path.relative(repoRoot, outPath)} (${passedTests}/${totalTests} tests passed).`);

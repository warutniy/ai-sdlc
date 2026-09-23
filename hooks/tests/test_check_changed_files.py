#!/usr/bin/env python3

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from subprocess import CompletedProcess
from unittest.mock import patch

SCRIPT_PATH = Path(__file__).resolve().parents[2] / ".codex/hooks/check_changed_files.py"
SPEC = importlib.util.spec_from_file_location("check_changed_files", SCRIPT_PATH)
assert SPEC and SPEC.loader
QUALITY_HOOK = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(QUALITY_HOOK)


class QualityHookTests(unittest.TestCase):
    def test_extracts_paths_from_apply_patch_command(self):
        payload = {
            "tool_input": {
                "command": (
                    "*** Begin Patch\n"
                    "*** Update File: lib/format.ts\n"
                    "*** Add File: app/example.tsx\n"
                    "*** End Patch"
                )
            }
        }

        self.assertEqual(
            QUALITY_HOOK.extract_candidate_paths(payload),
            ["lib/format.ts", "app/example.tsx"],
        )

    def test_normalizes_source_paths_and_rejects_outside_paths(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "lib/format.ts"
            source.parent.mkdir()
            source.write_text("export const value = 1;\n")
            (root / "README.md").write_text("docs\n")

            paths = QUALITY_HOOK.normalize_source_paths(
                ["lib/format.ts", "README.md", "../outside.ts"], root
            )

        self.assertEqual(paths, [Path("lib/format.ts")])

    def test_builds_lint_typecheck_and_related_test_commands(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            lib = root / "lib"
            lib.mkdir()
            (lib / "format.ts").write_text("export const value = 1;\n")
            (lib / "format.test.ts").write_text("// test\n")

            commands = QUALITY_HOOK.build_commands([Path("lib/format.ts")], root)

        self.assertEqual([command[0] for command in commands], ["ESLint", "TypeScript", "Vitest"])
        self.assertIn("lib/format.test.ts", commands[-1][1])

    def test_feedback_uses_post_tool_use_additional_context(self):
        output = QUALITY_HOOK.hook_output("Quality warning", "Fix the reported lint error.")

        self.assertEqual(output["systemMessage"], "Quality warning")
        self.assertEqual(
            output["hookSpecificOutput"],
            {
                "hookEventName": "PostToolUse",
                "additionalContext": "Fix the reported lint error.",
            },
        )
        json.dumps(output)

    def test_typecheck_ignores_errors_outside_changed_files(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            executable = root / "node_modules/.bin/tsc"
            executable.parent.mkdir(parents=True)
            executable.touch()
            result = CompletedProcess(
                [str(executable)],
                returncode=2,
                stdout="app/layout.tsx(20,50): error TS2304: Missing name.\n",
                stderr="",
            )

            with patch.object(QUALITY_HOOK.subprocess, "run", return_value=result):
                failure = QUALITY_HOOK.run_command(
                    "TypeScript",
                    [str(executable)],
                    "npx tsc --noEmit",
                    root,
                    [Path("lib/format.ts")],
                )

        self.assertIsNone(failure)

    def test_typecheck_reports_errors_in_changed_files(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            executable = root / "node_modules/.bin/tsc"
            executable.parent.mkdir(parents=True)
            executable.touch()
            result = CompletedProcess(
                [str(executable)],
                returncode=2,
                stdout="lib/format.ts(8,14): error TS2345: Invalid value.\n",
                stderr="",
            )

            with patch.object(QUALITY_HOOK.subprocess, "run", return_value=result):
                failure = QUALITY_HOOK.run_command(
                    "TypeScript",
                    [str(executable)],
                    "npx tsc --noEmit",
                    root,
                    [Path("lib/format.ts")],
                )

        self.assertIn("lib/format.ts(8,14)", failure)


if __name__ == "__main__":
    unittest.main()

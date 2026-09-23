#!/usr/bin/env python3

from __future__ import annotations

import json
import os
import re
import shlex
import subprocess
import sys
from pathlib import Path
from typing import Iterable, Sequence

PROJECT_ROOT = Path(__file__).resolve().parents[2]
SOURCE_SUFFIXES = {".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".mts", ".cts"}
TYPESCRIPT_SUFFIXES = {".ts", ".tsx", ".mts", ".cts"}
IGNORED_PARTS = {
    ".git",
    ".next",
    "build",
    "coverage",
    "dist",
    "node_modules",
    "out",
    "storybook-static",
}
PATCH_FILE_RE = re.compile(r"^\*\*\* (?:Add|Update|Delete) File: (.+)$", re.MULTILINE)
TEST_FILE_RE = re.compile(r"\.(?:test|spec)\.[^.]+$")
MAX_OUTPUT_LINES = 40
COMMAND_TIMEOUT_SECONDS = 18


def extract_candidate_paths(payload: object) -> list[str]:
    if not isinstance(payload, dict):
        return []

    tool_input = payload.get("tool_input") or {}
    candidates: list[str] = []
    command = ""

    if isinstance(tool_input, dict):
        for key in ("file_path", "path"):
            value = tool_input.get(key)
            if isinstance(value, str):
                candidates.append(value)
        value = tool_input.get("command")
        if isinstance(value, str):
            command = value
    elif isinstance(tool_input, str):
        command = tool_input

    candidates.extend(match.group(1).strip() for match in PATCH_FILE_RE.finditer(command))
    return candidates


def normalize_source_paths(
    candidates: Iterable[str], root: Path = PROJECT_ROOT
) -> list[Path]:
    root = root.resolve()
    normalized: set[Path] = set()

    for raw_path in candidates:
        path = Path(raw_path.strip().strip('"'))
        resolved = (path if path.is_absolute() else root / path).resolve()
        try:
            relative = resolved.relative_to(root)
        except ValueError:
            continue

        if any(part in IGNORED_PARTS for part in relative.parts):
            continue
        if resolved.suffix.lower() not in SOURCE_SUFFIXES:
            continue
        if resolved.name.endswith(".d.ts") or not resolved.is_file():
            continue
        normalized.add(relative)

    return sorted(normalized, key=lambda path: path.as_posix())


def related_tests(paths: Iterable[Path], root: Path = PROJECT_ROOT) -> list[Path]:
    tests: set[Path] = set()
    for relative in paths:
        if TEST_FILE_RE.search(relative.name):
            tests.add(relative)
            continue

        candidate = relative.with_name(f"{relative.stem}.test{relative.suffix}")
        if (root / candidate).is_file():
            tests.add(candidate)

    return sorted(tests, key=lambda path: path.as_posix())


def build_commands(
    paths: Sequence[Path], root: Path = PROJECT_ROOT
) -> list[tuple[str, list[str], str]]:
    if not paths:
        return []

    bin_dir = root / "node_modules" / ".bin"
    path_args = [path.as_posix() for path in paths]
    commands = [
        (
            "ESLint",
            [str(bin_dir / "eslint"), *path_args],
            shlex.join(["npm", "run", "lint", "--", *path_args]),
        )
    ]

    if any(path.suffix.lower() in TYPESCRIPT_SUFFIXES for path in paths):
        commands.append(
            (
                "TypeScript",
                [
                    str(bin_dir / "tsc"),
                    "--noEmit",
                    "--pretty",
                    "false",
                    "--incremental",
                    "false",
                ],
                "npx tsc --noEmit --pretty false --incremental false",
            )
        )

    tests = related_tests(paths, root)
    if tests:
        test_args = [path.as_posix() for path in tests]
        commands.append(
            (
                "Vitest",
                [str(bin_dir / "vitest"), "run", "--project", "server", *test_args],
                shlex.join(["npx", "vitest", "run", "--project", "server", *test_args]),
            )
        )

    return commands


def compact_output(output: str) -> str:
    lines = output.strip().splitlines()
    if len(lines) <= MAX_OUTPUT_LINES:
        return "\n".join(lines)
    half = MAX_OUTPUT_LINES // 2
    return "\n".join([*lines[:half], "... output truncated ...", *lines[-half:]])


def run_command(
    label: str,
    args: Sequence[str],
    reproduce: str,
    root: Path = PROJECT_ROOT,
    focus_paths: Sequence[Path] = (),
) -> str | None:
    executable = Path(args[0])
    if not executable.is_file():
        return f"{label} unavailable. Run `npm ci` and retry."

    try:
        result = subprocess.run(
            args,
            cwd=root,
            capture_output=True,
            text=True,
            timeout=COMMAND_TIMEOUT_SECONDS,
            check=False,
        )
    except subprocess.TimeoutExpired:
        return f"{label} timed out after {COMMAND_TIMEOUT_SECONDS}s.\nReproduce: `{reproduce}`"
    except OSError as error:
        return f"{label} could not start: {error.strerror or type(error).__name__}."

    if result.returncode == 0:
        return None

    output = "\n".join(part for part in (result.stdout, result.stderr) if part)
    if label == "TypeScript" and focus_paths:
        prefixes = tuple(f"{path.as_posix()}(" for path in focus_paths)
        relevant_lines = [line for line in output.splitlines() if line.startswith(prefixes)]
        if not relevant_lines:
            return None
        output = "\n".join(relevant_lines)

    output = compact_output(output)
    details = f"\n{output}" if output else ""
    return f"{label} failed.\nReproduce: `{reproduce}`{details}"


def hook_output(message: str, context: str) -> dict[str, object]:
    return {
        "systemMessage": message,
        "hookSpecificOutput": {
            "hookEventName": "PostToolUse",
            "additionalContext": context,
        },
    }


def emit(message: str, context: str) -> None:
    print(json.dumps(hook_output(message, context), ensure_ascii=False))


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, UnicodeDecodeError):
        emit(
            "Focused quality checks were skipped.",
            "The PostToolUse hook received invalid JSON. Review the hook fixture/schema.",
        )
        return 0

    paths = normalize_source_paths(extract_candidate_paths(payload))
    commands = build_commands(paths)
    if not commands:
        return 0

    if os.environ.get("QUALITY_HOOK_DRY_RUN") == "1":
        planned = "\n".join(f"- {label}: `{reproduce}`" for label, _, reproduce in commands)
        emit("Focused quality check dry run.", f"Planned checks:\n{planned}")
        return 0

    failures = [
        failure
        for label, args, reproduce in commands
        if (
            failure := run_command(
                label,
                args,
                reproduce,
                focus_paths=paths if label == "TypeScript" else (),
            )
        )
        is not None
    ]
    if failures:
        emit(
            "Focused quality checks need attention.",
            "Fix the focused checks below before considering the edit complete:\n\n"
            + "\n\n".join(failures),
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

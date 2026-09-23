#!/usr/bin/env python3

import json
import re
import sys

BLOCKED_PATTERNS = [
    (r"(^|[;&|]\s*)git\s+push\b", "git push is disabled"),
    (r"(^|[;&|]\s*)git\s+reset\s+--hard\b", "git reset --hard is disabled"),
    (r"(^|[;&|]\s*)git\s+clean\s+-[^\s]*f", "git clean with force is disabled"),
    (r"(^|[;&|]\s*)rm\s+-[^\s]*r[^\s]*f", "recursive force delete is disabled"),
    (
        r"(^|[;&|]\s*)"
        r"(?=[^;&|]*(?:>{1,2}|\b(?:tee|touch|cp|mv)\b))"
        r"[^;&|]*(?:^|[\s/])"
        r"(?:\.env(?:\.[^\s/]*)?|id_rsa|private_key)\b",
        "writing credential files is disabled",
    ),
]


def deny(reason: str) -> None:
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": (
                        f"Blocked by project policy: {reason}."
                    ),
                }
            }
        )
    )
    raise SystemExit(0)


try:
    payload = json.load(sys.stdin)
except json.JSONDecodeError:
    deny("hook input is not valid JSON")

tool_name = payload.get("tool_name", "")
tool_input = payload.get("tool_input") or {}
command = tool_input.get("command", "")

if tool_name != "Bash":
    raise SystemExit(0)

for pattern, reason in BLOCKED_PATTERNS:
    if re.search(pattern, command):
        deny(reason)

raise SystemExit(0)

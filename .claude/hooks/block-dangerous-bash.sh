#!/usr/bin/env bash
# PreToolUse hook (matcher: Bash) — blocks `rm -rf` (any flag order/spelling:
# -rf, -fr, -Rf, --recursive --force, -r -f, ...) and `git push --force` /
# `-f` / `--force-with-lease`.
#
# Heuristic, not a full shell parser: it splits the command on ; & | (and
# newlines) into segments and inspects each segment's leading command +
# flags. It will NOT catch these buried inside `find -exec`, `xargs`, shell
# functions/aliases, or eval'd strings — this is a speed bump, not a sandbox.
set -euo pipefail

input="$(cat)"
command="$(printf '%s' "$input" | jq -r '.tool_input.command // empty')"

if [ -z "$command" ]; then
  exit 0
fi

match="$(printf '%s' "$command" | awk '
  BEGIN { RS="[;&|\n]+" }
  {
    cmd = $0
    gsub(/^[ \t]+|[ \t]+$/, "", cmd)
    sub(/^sudo[ \t]+/, "", cmd)
    low = tolower(cmd)

    if (low ~ /^rm([ \t]|$)/) {
      r = 0; f = 0
      n = split(cmd, toks, /[ \t]+/)
      for (i = 1; i <= n; i++) {
        t = tolower(toks[i])
        if (t ~ /^-[a-z]+$/) {
          if (t ~ /r/) r = 1
          if (t ~ /f/) f = 1
        } else if (t == "--recursive") r = 1
        else if (t == "--force") f = 1
      }
      if (r && f) { print "rm"; exit }
    }

    if (low ~ /^git[ \t]+push([ \t]|$)/) {
      n = split(cmd, toks, /[ \t]+/)
      for (i = 1; i <= n; i++) {
        t = toks[i]
        if (t == "--force" || t == "-f" || t ~ /^--force-with-lease(=.*)?$/) { print "push"; exit }
      }
    }
  }
')"

case "$match" in
  rm)
    printf '%s\n' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked by project policy (.claude/hooks/block-dangerous-bash.sh): rm -rf is disabled for Claude. Ask the user to run it manually if it is really needed."}}'
    ;;
  push)
    printf '%s\n' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked by project policy (.claude/hooks/block-dangerous-bash.sh): git push --force is disabled for Claude. Ask the user to force-push manually if it is really needed."}}'
    ;;
esac

exit 0

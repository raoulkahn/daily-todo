# ISSUE-002: Storage error recovery

**Created**: 2026-02-10
**Priority**: Low
**Source**: Peer review (Cursor Composer)

## Description
`loadTasks()` silently returns `[]` when localStorage data is corrupt or unparseable. This means the user loses all their tasks with no feedback.

## Current behavior
Data corruption → empty array → user sees a blank app → old data is overwritten on next save.

## Desired behavior
- Log a warning to console
- Optionally show a non-blocking UI message ("Could not load saved tasks")
- Consider storing a backup key before overwriting

## Notes
Not critical for v1 — the only way data gets corrupted is manual localStorage editing or a browser bug. But worth addressing before v2.

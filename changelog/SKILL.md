---
name: changelog
description: Maintains CHANGELOG.md in the project root from git commit history. Use when asked to update the changelog or to record what changed before a merge. Creates the file from all commits when it is missing, and otherwise adds only commits newer than the latest dated heading.
---

# Changelog

## Workflow

1. From the project root, run:

```bash
python changelog/scripts/changelog.py
```

2. The script does one of two things:
   - If `CHANGELOG.md` is missing, it writes every commit, grouped by date.
   - If the file exists, it finds the newest `## YYYY-MM-DD` heading and prepends only newer commits.

3. Read the new bullets. Shorten a subject if it is unclear, then commit `CHANGELOG.md` with the merge.

## Format

```markdown
# Changelog

## 2026-11-05

- Add Vitest and mobile-first CSS

## 2026-11-04

- Initial project scaffold
```

- One `# Changelog` title
- Date headings as `## YYYY-MM-DD`, newest first
- One bullet per commit

## Notes

- Run it from the directory that contains `.git`
- The bullet text starts as the commit subject
- Running it again when nothing is new leaves the file unchanged

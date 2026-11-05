#!/usr/bin/env python3
"""Build CHANGELOG.md from git commit subjects, grouped by date."""

import subprocess
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path


def git_log(since_date=None):
    cmd = ["git", "log", "--format=%ad|%s", "--date=short"]
    if since_date:
        cmd.append(f"--after={since_date}")
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    by_date = defaultdict(list)
    for line in result.stdout.strip().splitlines():
        if "|" not in line:
            continue
        date, subject = line.split("|", 1)
        by_date[date.strip()].append(subject.strip())
    return by_date


def last_date(path):
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.startswith("## "):
            continue
        candidate = line[3:].strip()
        try:
            datetime.strptime(candidate, "%Y-%m-%d")
        except ValueError:
            continue
        return candidate
    return None


def render(by_date):
    lines = []
    for date in sorted(by_date, reverse=True):
        lines.append(f"\n## {date}\n")
        for subject in by_date[date]:
            lines.append(f"- {subject}\n")
    return lines


def main():
    changelog = Path("CHANGELOG.md")
    if not changelog.exists():
        by_date = git_log()
        if not by_date:
            print("No commits found.")
            return
        changelog.write_text("".join(["# Changelog\n"] + render(by_date)), encoding="utf-8")
        total = sum(len(items) for items in by_date.values())
        print(f"Created CHANGELOG.md with {total} entries.")
        return

    last = last_date(changelog)
    by_date = git_log(since_date=last)
    if last:
        by_date.pop(last, None)
    if not by_date:
        print("CHANGELOG.md is already up to date.")
        return

    existing = changelog.read_text(encoding="utf-8").splitlines(keepends=True)
    insert_at = 1 if existing and existing[0].startswith("# ") else 0
    updated = "".join(existing[:insert_at] + render(by_date) + existing[insert_at:])
    changelog.write_text(updated, encoding="utf-8")
    total = sum(len(items) for items in by_date.values())
    print(f"Added {total} entries to CHANGELOG.md.")


if __name__ == "__main__":
    main()

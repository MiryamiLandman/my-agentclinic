import { readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import type Database from "better-sqlite3";

const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "migrations");

export function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  const applied = new Set(
    (db.prepare("SELECT name FROM _migrations").all() as { name: string }[]).map((row) => row.name),
  );

  const files = readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    if (applied.has(file)) continue;
    db.exec(readFileSync(join(migrationsDir, file), "utf8"));
    db.prepare("INSERT INTO _migrations (name) VALUES (?)").run(file);
  }
}

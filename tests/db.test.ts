import { describe, expect, it } from "vitest";
import { createDb } from "../src/db/index";
import { migrate } from "../src/db/migrate";
import { seed } from "../src/db/seed";

const tables = [
  "animals",
  "ailments",
  "animal_ailments",
  "therapies",
  "ailment_therapies",
  "appointments",
  "feedback",
];

function freshDb() {
  const db = createDb(":memory:");
  migrate(db);
  return db;
}

function count(db: ReturnType<typeof freshDb>, table: string) {
  return (db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number }).count;
}

describe("migrate", () => {
  it("creates every clinic table", () => {
    const db = freshDb();
    for (const table of tables) {
      const row = db
        .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get(table);
      expect(row).toBeDefined();
    }
  });

  it("can run twice", () => {
    const db = freshDb();
    expect(() => migrate(db)).not.toThrow();
  });
});

describe("seed", () => {
  it("loads the clinic records", () => {
    const db = freshDb();
    seed(db);
    expect(count(db, "animals")).toBe(6);
    expect(count(db, "ailments")).toBe(4);
    expect(count(db, "therapies")).toBe(4);
    expect(count(db, "appointments")).toBe(2);
    expect(count(db, "feedback")).toBe(3);
  });

  it("does not duplicate animals when run twice", () => {
    const db = freshDb();
    seed(db);
    seed(db);
    expect(count(db, "animals")).toBe(6);
  });
});

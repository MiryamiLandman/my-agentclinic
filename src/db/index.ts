import Database from "better-sqlite3";

export function createDb(path: string = "petclinic.db") {
  const db = new Database(path);
  db.pragma("foreign_keys = ON");
  return db;
}

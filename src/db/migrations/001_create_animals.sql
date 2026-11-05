CREATE TABLE animals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'on_leave', 'discharged')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

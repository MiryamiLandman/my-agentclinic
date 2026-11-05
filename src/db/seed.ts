import type Database from "better-sqlite3";

const animals = [
  { id: 1, name: "נועה", species: "כלב", status: "active" },
  { id: 2, name: "קוקו", species: "חתול", status: "on_leave" },
  { id: 3, name: "פיסטוק", species: "ארנב", status: "active" },
  { id: 4, name: "לולה", species: "תוכי", status: "discharged" },
  { id: 5, name: "שוקו", species: "כלב", status: "active" },
  { id: 6, name: "מיה", species: "אוגר", status: "on_leave" },
];

const ailments = [
  { id: 1, name: "צליעה", description: "החיה נמנעת לדרוך על רגל אחת." },
  { id: 2, name: "פריחה בעור", description: "אדמומיות או גירוד בעור." },
  { id: 3, name: "חוסר תיאבון", description: "החיה אוכלת פחות מהרגיל." },
  { id: 4, name: "נשירת נוצות", description: "נוצות נושרות מחוץ לעונה." },
];

const links: [number, number[]][] = [
  [1, [1]],
  [2, [2]],
  [3, [3]],
  [4, [4]],
  [5, [1, 2]],
  [6, [3]],
];

export function seed(db: Database.Database) {
  const insertAnimal = db.prepare(
    "INSERT OR IGNORE INTO animals (id, name, species, status) VALUES (@id, @name, @species, @status)",
  );
  const insertAilment = db.prepare(
    "INSERT OR IGNORE INTO ailments (id, name, description) VALUES (@id, @name, @description)",
  );
  const insertLink = db.prepare(
    "INSERT OR IGNORE INTO animal_ailments (animal_id, ailment_id) VALUES (?, ?)",
  );

  for (const animal of animals) insertAnimal.run(animal);
  for (const ailment of ailments) insertAilment.run(ailment);
  for (const [animalId, ailmentIds] of links) {
    for (const ailmentId of ailmentIds) insertLink.run(animalId, ailmentId);
  }
}

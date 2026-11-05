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

const therapies = [
  { id: 1, name: "מנוחה וקיבוע", description: "הגבלת תנועה עד שהרגל נרגעת." },
  { id: 2, name: "משחה לעור", description: "מריחה מקומית להרגעת גירוד." },
  { id: 3, name: "מעקב תזונה", description: "בדיקת מה החיה אוכלת ומתי." },
  { id: 4, name: "בדיקת נוצות", description: "בדיקה אם הנשירה עונתית או דורשת טיפול." },
];

const therapyLinks: [number, number][] = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
];

const appointments = [
  { id: 1, animal_id: 1, therapist_name: "ד״ר לוי", scheduled_at: "2099-01-15T10:00:00", status: "confirmed" },
  { id: 2, animal_id: 3, therapist_name: "ד״ר כהן", scheduled_at: "2099-02-20T14:30:00", status: "pending" },
];

const feedback = [
  {
    id: 1,
    name: "דנה",
    email: "dana@example.com",
    message: "נועה חזרה הביתה רגועה אחרי הקיבוע.",
    rating: 5,
    created_at: "2026-11-01 09:00:00",
  },
  {
    id: 2,
    name: "יוסי",
    email: null,
    message: "המשחה עזרה לקוקו, אבל הגירוד עוד לא נגמר.",
    rating: 3,
    created_at: "2026-11-02 11:30:00",
  },
  {
    id: 3,
    name: "מיכל",
    email: "michal@example.com",
    message: "פיסטוק התחיל לאכול אחרי מעקב התזונה.",
    rating: 4,
    created_at: "2026-11-03 16:15:00",
  },
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
  const insertTherapy = db.prepare(
    "INSERT OR IGNORE INTO therapies (id, name, description) VALUES (@id, @name, @description)",
  );
  const insertTherapyLink = db.prepare(
    "INSERT OR IGNORE INTO ailment_therapies (ailment_id, therapy_id) VALUES (?, ?)",
  );
  const insertAppointment = db.prepare(
    "INSERT OR IGNORE INTO appointments (id, animal_id, therapist_name, scheduled_at, status) VALUES (@id, @animal_id, @therapist_name, @scheduled_at, @status)",
  );
  const insertFeedback = db.prepare(
    "INSERT OR IGNORE INTO feedback (id, name, email, message, rating, created_at) VALUES (@id, @name, @email, @message, @rating, @created_at)",
  );

  for (const animal of animals) insertAnimal.run(animal);
  for (const ailment of ailments) insertAilment.run(ailment);
  for (const [animalId, ailmentIds] of links) {
    for (const ailmentId of ailmentIds) insertLink.run(animalId, ailmentId);
  }
  for (const therapy of therapies) insertTherapy.run(therapy);
  for (const [ailmentId, therapyId] of therapyLinks) insertTherapyLink.run(ailmentId, therapyId);
  for (const appointment of appointments) insertAppointment.run(appointment);
  for (const note of feedback) insertFeedback.run(note);
}

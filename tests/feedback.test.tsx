import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";
import { createDb } from "../src/db/index";
import { migrate } from "../src/db/migrate";
import { seed } from "../src/db/seed";

function buildApp() {
  const db = createDb(":memory:");
  migrate(db);
  seed(db);
  return { app: createApp(db), db };
}

describe("feedback", () => {
  it("lists seeded notes", async () => {
    const { app } = buildApp();
    const res = await app.request("/feedback");
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(html).toContain("משוב");
    expect(html).toContain("נועה חזרה הביתה רגועה אחרי הקיבוע.");
    expect(html).toContain('href="/feedback"');
  });

  it("saves a valid note and redirects", async () => {
    const { app, db } = buildApp();
    const res = await app.request("/feedback", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name: "רותם",
        email: "",
        message: "הביקור היה קצר וברור.",
        rating: "5",
      }),
    });
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("/feedback");
    const saved = db.prepare("SELECT name, email, rating FROM feedback WHERE name = ?").get("רותם") as {
      name: string;
      email: string | null;
      rating: number;
    };
    expect(saved.email).toBeNull();
    expect(saved.rating).toBe(5);
  });

  it("rejects a note with no name", async () => {
    const { app } = buildApp();
    const res = await app.request("/feedback", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name: "",
        message: "יש הערה",
        rating: "4",
      }),
    });
    const html = await res.text();
    expect(res.status).toBe(400);
    expect(html).toContain("יש להזין שם");
  });

  it("rejects a rating outside 1 to 5", async () => {
    const { app, db } = buildApp();
    const before = (db.prepare("SELECT COUNT(*) AS count FROM feedback").get() as { count: number }).count;
    const res = await app.request("/feedback", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name: "רותם",
        message: "דירוג לא תקין",
        rating: "9",
      }),
    });
    const after = (db.prepare("SELECT COUNT(*) AS count FROM feedback").get() as { count: number }).count;
    expect(res.status).toBe(400);
    expect(after).toBe(before);
  });
});

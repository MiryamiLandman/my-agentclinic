import { describe, expect, it } from "vitest";
import { ServerError } from "../src/pages/ServerError";
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

describe("pages another agent must keep", () => {
  it("links an animal card to booking", async () => {
    const { app } = buildApp();
    const html = await (await app.request("/animals/1")).text();
    expect(html).toContain('href="/animals/1/appointments/new"');
    expect(html).toContain("קביעת תור");
  });

  it("shows the therapy next to the ailment", async () => {
    const { app } = buildApp();
    const html = await (await app.request("/ailments")).text();
    expect(html).toContain("צליעה");
    expect(html).toContain("מנוחה וקיבוע");
  });

  it("shows Hebrew statuses and the open-appointment count", async () => {
    const { app } = buildApp();
    const html = await (await app.request("/dashboard")).text();
    expect(html).toContain("<h2>6</h2>");
    expect(html).toContain("<h2>2</h2>");
    expect(html).toContain("בחופשה");
    expect(html).toContain("שוחרר");
    expect(html).toContain("אושר");
    expect(html).toContain("ממתין");
  });

  it("rejects a booking with no vet and does not save it", async () => {
    const { app, db } = buildApp();
    const before = (db.prepare("SELECT COUNT(*) as count FROM appointments").get() as { count: number }).count;
    const res = await app.request("/animals/1/appointments", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ therapist_name: "", date: "2099-06-01", time: "10:30" }),
    });
    const html = await res.text();
    const after = (db.prepare("SELECT COUNT(*) as count FROM appointments").get() as { count: number }).count;
    expect(html).toContain("יש להזין שם וטרינר");
    expect(after).toBe(before);
  });

  it("rejects an appointment in the past", async () => {
    const { app } = buildApp();
    const res = await app.request("/animals/1/appointments", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ therapist_name: "ד״ר לוי", date: "2000-01-01", time: "10:30" }),
    });
    expect(await res.text()).toContain("התור חייב להיות בעתיד");
  });

  it("strips tags from a vet name and confirms the visit", async () => {
    const { app } = buildApp();
    const res = await app.request("/animals/1/appointments", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        therapist_name: "<b>ד״ר לוי</b>",
        date: "2099-07-01",
        time: "09:00",
      }),
    });
    const location = res.headers.get("location");
    expect(res.status).toBe(302);
    const html = await (await app.request(location ?? "")).text();
    expect(html).toContain("התור נקבע");
    expect(html).toContain("ד״ר לוי");
    expect(html).not.toContain("<b>");
    expect(html).toContain("ממתין");
  });

  it("strips tags from a feedback name", async () => {
    const { app, db } = buildApp();
    await app.request("/feedback", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name: "<b>רותם</b>",
        message: "תודה",
        rating: "5",
      }),
    });
    const saved = db.prepare("SELECT name FROM feedback WHERE message = ?").get("תודה") as { name: string };
    expect(saved.name).toBe("רותם");
  });

  it("renders the server error page", () => {
    const html = ServerError({}).toString();
    expect(html).toContain("משהו השתבש");
    expect(html).toContain("<header");
  });
});

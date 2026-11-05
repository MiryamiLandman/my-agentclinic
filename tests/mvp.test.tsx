import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";
import { createDb } from "../src/db/index";
import { migrate } from "../src/db/migrate";
import { seed } from "../src/db/seed";

function buildApp() {
  const db = createDb(":memory:");
  migrate(db);
  seed(db);
  return createApp(db);
}

describe("MVP pages", () => {
  it("lists therapies", async () => {
    const res = await buildApp().request("/therapies");
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(html).toContain("מנוחה וקיבוע");
  });

  it("books a future appointment", async () => {
    const app = buildApp();
    const res = await app.request("/animals/1/appointments", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        therapist_name: "ד״ר לוי",
        date: "2099-06-01",
        time: "10:30",
      }),
    });
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toMatch(/\/animals\/1\/appointments\/\d+$/);
  });

  it("shows the staff dashboard", async () => {
    const res = await buildApp().request("/dashboard");
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(html).toContain("דשבורד");
    expect(html).toContain("נועה");
  });

  it("renders a Hebrew not-found page", async () => {
    const res = await buildApp().request("/missing");
    const html = await res.text();
    expect(res.status).toBe(404);
    expect(html).toContain("העמוד לא נמצא");
  });
});

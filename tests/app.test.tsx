import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";
import { createDb } from "../src/db/index";
import { migrate } from "../src/db/migrate";
import { seed } from "../src/db/seed";

const db = createDb(":memory:");
migrate(db);
seed(db);
const app = createApp(db);

describe("GET /", () => {
  it("returns 200 OK", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
  });

  it("returns HTML", async () => {
    const res = await app.request("/");
    expect(res.headers.get("content-type")).toContain("text/html");
  });

  it("shows the Hebrew heading", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain("<h1>המרפאה פתוחה</h1>");
  });

  it("shows the tagline", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain("<p>בעל חיה רואה את החיה, את הטיפול, וקובע תור.</p>");
  });

  it("links the stylesheet", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain('href="/static/style.css"');
  });

  it("links to animals and ailments", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain('href="/animals"');
    expect(html).toContain('href="/ailments"');
  });
});

describe("animals and ailments", () => {
  it("lists animals", async () => {
    const res = await app.request("/animals");
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(html).toContain("חיות");
    expect(html).toContain("נועה");
  });

  it("shows one animal card", async () => {
    const res = await app.request("/animals/1");
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(html).toContain("נועה");
    expect(html).toContain("כלב");
    expect(html).toContain("בטיפול");
    expect(html).toContain("צליעה");
  });

  it("returns 404 for an unknown animal", async () => {
    const res = await app.request("/animals/9999");
    expect(res.status).toBe(404);
  });

  it("lists ailments", async () => {
    const res = await app.request("/ailments");
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(html).toContain("תסמינים");
    expect(html).toContain("צליעה");
  });
});

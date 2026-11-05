import { describe, expect, it } from "vitest";
import app from "../src/app";

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
});

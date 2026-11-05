import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("static/style.css", "utf8");

describe("brand colors", () => {
  it("paints the header teal", () => {
    expect(css).toContain("--color-header: #0f766e");
    expect(css).toContain("background: var(--color-header)");
  });

  it("uses ink for the text", () => {
    expect(css).toContain("--color-text: #1c2b29");
    expect(css).toContain("color: var(--color-text)");
  });
});

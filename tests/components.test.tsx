import { describe, expect, it } from "vitest";
import { Footer } from "../src/components/Footer";
import { Header } from "../src/components/Header";
import { Layout } from "../src/components/Layout";
import { Main } from "../src/components/Main";

describe("Header", () => {
  it("renders a header", () => {
    expect(Header({}).toString()).toContain("<header");
  });

  it("links home", () => {
    expect(Header({}).toString()).toContain('href="/"');
  });

  it("shows the clinic name", () => {
    expect(Header({}).toString()).toContain("מרפאת החיות");
  });
});

describe("Footer", () => {
  it("renders a footer", () => {
    expect(Footer({}).toString()).toContain("<footer");
  });

  it("shows the current year", () => {
    expect(Footer({}).toString()).toContain(String(new Date().getFullYear()));
  });

  it("shows the clinic name", () => {
    expect(Footer({}).toString()).toContain("מרפאת החיות");
  });
});

describe("Main", () => {
  it("renders a main element", () => {
    expect(Main({ children: "content" }).toString()).toContain("<main");
  });

  it("renders its children", () => {
    expect(Main({ children: "hello world" }).toString()).toContain("hello world");
  });
});

describe("Layout", () => {
  it("uses Hebrew and right-to-left", () => {
    const html = Layout({ children: "" }).toString();
    expect(html).toContain('lang="he"');
    expect(html).toContain('dir="rtl"');
  });

  it("sets the title", () => {
    expect(Layout({ children: "" }).toString()).toContain("<title>מרפאת החיות</title>");
  });

  it("links the stylesheet", () => {
    expect(Layout({ children: "" }).toString()).toContain('href="/static/style.css"');
  });

  it("renders its children", () => {
    expect(Layout({ children: "page content" }).toString()).toContain("page content");
  });

  it("includes the header and the footer", () => {
    const html = Layout({ children: "" }).toString();
    expect(html).toContain("<header");
    expect(html).toContain("<footer");
  });

  it("includes a viewport meta tag", () => {
    const html = Layout({ children: "" }).toString();
    expect(html).toContain('name="viewport"');
    expect(html).toContain("width=device-width");
  });
});

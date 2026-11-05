import { serveStatic } from "@hono/node-server/serve-static";
import type Database from "better-sqlite3";
import { Hono } from "hono";
import { Home } from "./pages/Home";
import { ailmentsRouter } from "./routes/ailments";
import { animalsRouter } from "./routes/animals";

export function createApp(db: Database.Database) {
  const app = new Hono();

  app.use("/static/*", serveStatic({ root: "./" }));
  app.get("/", (c) => c.html(<Home />));
  app.route("/animals", animalsRouter(db));
  app.route("/ailments", ailmentsRouter(db));

  return app;
}

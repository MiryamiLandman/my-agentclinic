import { serveStatic } from "@hono/node-server/serve-static";
import type Database from "better-sqlite3";
import { Hono } from "hono";
import { logger } from "./middleware/logger";
import { NotFound } from "./pages/NotFound";
import { ServerError } from "./pages/ServerError";
import { Home } from "./pages/Home";
import { ailmentsRouter } from "./routes/ailments";
import { animalsRouter } from "./routes/animals";
import { appointmentsRouter } from "./routes/appointments";
import { dashboardRouter } from "./routes/dashboard";
import { therapiesRouter } from "./routes/therapies";

export function createApp(db: Database.Database) {
  const app = new Hono();

  app.use("*", logger);
  app.use("/static/*", serveStatic({ root: "./" }));
  app.get("/", (c) => c.html(<Home />));
  app.route("/animals", animalsRouter(db));
  app.route("/animals", appointmentsRouter(db));
  app.route("/ailments", ailmentsRouter(db));
  app.route("/therapies", therapiesRouter(db));
  app.route("/dashboard", dashboardRouter(db));
  app.notFound((c) => c.html(<NotFound />, 404));
  app.onError((_error, c) => c.html(<ServerError />, 500));

  return app;
}

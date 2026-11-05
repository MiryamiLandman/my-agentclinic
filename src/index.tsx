import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Home } from "./pages/Home";

const app = new Hono();

app.get("/", (c) => {
  return c.html(<Home />);
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`);
});

import { serve } from "@hono/node-server";
import { createApp } from "./app";
import { createDb } from "./db/index";
import { migrate } from "./db/migrate";
import { seed } from "./db/seed";

const db = createDb();
migrate(db);
seed(db);

serve({ fetch: createApp(db).fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`);
});

import type Database from "better-sqlite3";
import { Hono } from "hono";
import { AnimalDetail } from "../components/AnimalDetail";
import { AnimalsList } from "../components/AnimalsList";
import type { Ailment, Animal } from "../db/types";

export function animalsRouter(db: Database.Database) {
  const router = new Hono();
  const selectAll = db.prepare("SELECT * FROM animals ORDER BY name");
  const selectById = db.prepare("SELECT * FROM animals WHERE id = ?");
  const selectAilments = db.prepare(
    `SELECT al.* FROM ailments al
     JOIN animal_ailments aa ON al.id = aa.ailment_id
     WHERE aa.animal_id = ?
     ORDER BY al.name`,
  );

  router.get("/", (c) => {
    const animals = selectAll.all() as Animal[];
    return c.html(<AnimalsList animals={animals} />);
  });

  router.get("/:id", (c) => {
    const id = Number(c.req.param("id"));
    const animal = selectById.get(id) as Animal | undefined;
    if (!animal) return c.notFound();
    const ailments = selectAilments.all(id) as Ailment[];
    return c.html(<AnimalDetail animal={animal} ailments={ailments} />);
  });

  return router;
}

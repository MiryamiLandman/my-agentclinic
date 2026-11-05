import type Database from "better-sqlite3";
import { Hono } from "hono";
import { AilmentsList } from "../components/AilmentsList";

type AilmentRow = {
  id: number;
  name: string;
  description: string;
  therapies: string;
};

export function ailmentsRouter(db: Database.Database) {
  const router = new Hono();
  const selectAll = db.prepare(
    `SELECT al.id, al.name, al.description,
            COALESCE(GROUP_CONCAT(t.name, ', '), '') AS therapies
     FROM ailments al
     LEFT JOIN ailment_therapies link ON al.id = link.ailment_id
     LEFT JOIN therapies t ON t.id = link.therapy_id
     GROUP BY al.id
     ORDER BY al.name`,
  );

  router.get("/", (c) => {
    const ailments = selectAll.all() as AilmentRow[];
    return c.html(<AilmentsList ailments={ailments} />);
  });

  return router;
}

import type Database from "better-sqlite3";
import { Hono } from "hono";
import { Dashboard } from "../components/Dashboard";

export function dashboardRouter(db: Database.Database) {
  const router = new Hono();
  const countAnimals = db.prepare("SELECT COUNT(*) as count FROM animals");
  const countOpenAppointments = db.prepare(
    "SELECT COUNT(*) as count FROM appointments WHERE status IN ('pending', 'confirmed')",
  );
  const countActiveAilments = db.prepare(
    `SELECT COUNT(DISTINCT link.ailment_id) as count
     FROM animal_ailments link
     JOIN animals animal ON link.animal_id = animal.id
     WHERE animal.status = 'active'`,
  );
  const selectAnimals = db.prepare("SELECT id, name, species, status FROM animals ORDER BY name");
  const selectAppointments = db.prepare(
    `SELECT appointment.id, animal.name as animal_name, appointment.therapist_name,
            appointment.scheduled_at, appointment.status
     FROM appointments appointment
     JOIN animals animal ON appointment.animal_id = animal.id
     WHERE appointment.status IN ('pending', 'confirmed')
     ORDER BY appointment.scheduled_at`,
  );
  const selectAilments = db.prepare(
    `SELECT ailment.id, ailment.name, COUNT(link.animal_id) as animal_count
     FROM ailments ailment
     LEFT JOIN animal_ailments link ON ailment.id = link.ailment_id
     GROUP BY ailment.id
     ORDER BY ailment.name`,
  );

  router.get("/", (c) => {
    return c.html(
      <Dashboard
        stats={{
          animalCount: (countAnimals.get() as { count: number }).count,
          openAppointmentCount: (countOpenAppointments.get() as { count: number }).count,
          activeAilmentCount: (countActiveAilments.get() as { count: number }).count,
        }}
        animals={selectAnimals.all() as { id: number; name: string; species: string; status: string }[]}
        appointments={
          selectAppointments.all() as {
            id: number;
            animal_name: string;
            therapist_name: string;
            scheduled_at: string;
            status: string;
          }[]
        }
        ailments={selectAilments.all() as { id: number; name: string; animal_count: number }[]}
      />,
    );
  });

  return router;
}

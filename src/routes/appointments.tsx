import type Database from "better-sqlite3";
import { Hono } from "hono";
import { AppointmentConfirmation } from "../components/AppointmentConfirmation";
import { AppointmentForm } from "../components/AppointmentForm";
import type { Animal, Appointment } from "../db/types";

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, "").trim();
}

export function appointmentsRouter(db: Database.Database) {
  const router = new Hono();
  const selectAnimal = db.prepare("SELECT * FROM animals WHERE id = ?");
  const insertAppointment = db.prepare(
    "INSERT INTO appointments (animal_id, therapist_name, scheduled_at) VALUES (?, ?, ?)",
  );
  const selectAppointment = db.prepare("SELECT * FROM appointments WHERE id = ?");

  router.get("/:id/appointments/new", (c) => {
    const id = Number(c.req.param("id"));
    const animal = selectAnimal.get(id) as Animal | undefined;
    if (!animal) return c.notFound();
    return c.html(<AppointmentForm animalId={id} animalName={animal.name} />);
  });

  router.post("/:id/appointments", async (c) => {
    const id = Number(c.req.param("id"));
    const animal = selectAnimal.get(id) as Animal | undefined;
    if (!animal) return c.notFound();

    const body = await c.req.parseBody();
    const therapistName = stripHtml(String(body.therapist_name ?? ""));
    const date = String(body.date ?? "").trim();
    const time = String(body.time ?? "").trim();
    const errors: Record<string, string> = {};

    if (!therapistName) errors.therapist_name = "יש להזין שם וטרינר";
    if (!date) errors.date = "יש לבחור תאריך";
    if (!time) errors.time = "יש לבחור שעה";

    const scheduledAt = `${date}T${time}:00`;
    if (!errors.date && !errors.time && new Date(scheduledAt) <= new Date()) {
      errors.general = "התור חייב להיות בעתיד";
    }

    if (Object.keys(errors).length > 0) {
      return c.html(
        <AppointmentForm
          animalId={id}
          animalName={animal.name}
          errors={errors}
          values={{ therapist_name: therapistName, date, time }}
        />,
      );
    }

    const result = insertAppointment.run(id, therapistName, scheduledAt);
    const appointmentId = Number(result.lastInsertRowid);
    return c.redirect(`/animals/${id}/appointments/${appointmentId}`);
  });

  router.get("/:id/appointments/:appointmentId", (c) => {
    const id = Number(c.req.param("id"));
    const appointmentId = Number(c.req.param("appointmentId"));
    const animal = selectAnimal.get(id) as Animal | undefined;
    if (!animal) return c.notFound();
    const appointment = selectAppointment.get(appointmentId) as Appointment | undefined;
    if (!appointment) return c.notFound();
    return c.html(<AppointmentConfirmation appointment={appointment} animalName={animal.name} />);
  });

  return router;
}

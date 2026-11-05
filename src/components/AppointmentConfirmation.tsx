import type { FC } from "hono/jsx";
import type { Appointment } from "../db/types";
import { appointmentStatusLabel } from "../labels";
import { Layout } from "./Layout";

type AppointmentConfirmationProps = {
  appointment: Appointment;
  animalName: string;
};

export const AppointmentConfirmation: FC<AppointmentConfirmationProps> = ({
  appointment,
  animalName,
}) => (
  <Layout>
    <article>
      <h1>התור נקבע</h1>
      <p>
        <strong>חיה:</strong> {animalName}
      </p>
      <p>
        <strong>וטרינר:</strong> {appointment.therapist_name}
      </p>
      <p>
        <strong>מועד:</strong> {appointment.scheduled_at}
      </p>
      <p>
        <strong>סטטוס:</strong> {appointmentStatusLabel(appointment.status)}
      </p>
    </article>
    <p>
      <a href={`/animals/${appointment.animal_id}`}>חזרה לכרטיס</a>
    </p>
  </Layout>
);

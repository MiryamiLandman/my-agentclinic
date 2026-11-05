import type { FC } from "hono/jsx";
import { appointmentStatusLabel, statusLabel } from "../labels";
import { Layout } from "./Layout";

type Stats = {
  animalCount: number;
  openAppointmentCount: number;
  activeAilmentCount: number;
};

type AnimalRow = { id: number; name: string; species: string; status: string };

type AppointmentRow = {
  id: number;
  animal_name: string;
  therapist_name: string;
  scheduled_at: string;
  status: string;
};

type AilmentRow = { id: number; name: string; animal_count: number };

type DashboardProps = {
  stats: Stats;
  animals: AnimalRow[];
  appointments: AppointmentRow[];
  ailments: AilmentRow[];
};

export const Dashboard: FC<DashboardProps> = ({ stats, animals, appointments, ailments }) => (
  <Layout>
    <h1>דשבורד</h1>
    <div class="stats">
      <article>
        <h2>{stats.animalCount}</h2>
        <p>חיות</p>
      </article>
      <article>
        <h2>{stats.openAppointmentCount}</h2>
        <p>תורים פתוחים</p>
      </article>
      <article>
        <h2>{stats.activeAilmentCount}</h2>
        <p>תסמינים אצל חיות בטיפול</p>
      </article>
    </div>

    <h2>חיות</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">שם</th>
          <th scope="col">מין</th>
          <th scope="col">סטטוס</th>
        </tr>
      </thead>
      <tbody>
        {animals.map((animal) => (
          <tr key={animal.id}>
            <td>
              <a href={`/animals/${animal.id}`}>{animal.name}</a>
            </td>
            <td>{animal.species}</td>
            <td>{statusLabel(animal.status)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>תורים פתוחים</h2>
    {appointments.length === 0 ? (
      <p>אין תורים פתוחים.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th scope="col">חיה</th>
            <th scope="col">וטרינר</th>
            <th scope="col">מועד</th>
            <th scope="col">סטטוס</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.animal_name}</td>
              <td>{appointment.therapist_name}</td>
              <td>{appointment.scheduled_at}</td>
              <td>{appointmentStatusLabel(appointment.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    <h2>תסמינים</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">שם</th>
          <th scope="col">מספר חיות</th>
        </tr>
      </thead>
      <tbody>
        {ailments.map((ailment) => (
          <tr key={ailment.id}>
            <td>{ailment.name}</td>
            <td>{ailment.animal_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Layout>
);

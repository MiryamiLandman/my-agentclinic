import type { FC } from "hono/jsx";
import { Layout } from "./Layout";

type FormErrors = {
  therapist_name?: string;
  date?: string;
  time?: string;
  general?: string;
};

type FormValues = {
  therapist_name?: string;
  date?: string;
  time?: string;
};

type AppointmentFormProps = {
  animalId: number;
  animalName: string;
  errors?: FormErrors;
  values?: FormValues;
};

export const AppointmentForm: FC<AppointmentFormProps> = ({
  animalId,
  animalName,
  errors = {},
  values = {},
}) => (
  <Layout>
    <h1>קביעת תור</h1>
    <p>
      חיה: <strong>{animalName}</strong>
    </p>
    <form method="post" action={`/animals/${animalId}/appointments`}>
      <label>
        שם הווטרינר
        <input
          type="text"
          name="therapist_name"
          value={values.therapist_name ?? ""}
          required
          aria-describedby={errors.therapist_name ? "err-therapist" : undefined}
        />
        {errors.therapist_name && <small id="err-therapist">{errors.therapist_name}</small>}
      </label>
      <label>
        תאריך
        <input
          type="date"
          name="date"
          value={values.date ?? ""}
          required
          aria-describedby={errors.date ? "err-date" : undefined}
        />
        {errors.date && <small id="err-date">{errors.date}</small>}
      </label>
      <label>
        שעה
        <input
          type="time"
          name="time"
          value={values.time ?? ""}
          required
          aria-describedby={errors.time ? "err-time" : undefined}
        />
        {errors.time && <small id="err-time">{errors.time}</small>}
      </label>
      {errors.general && (
        <p>
          <strong>{errors.general}</strong>
        </p>
      )}
      <button type="submit">קביעת תור</button>
    </form>
    <p>
      <a href={`/animals/${animalId}`}>חזרה לכרטיס</a>
    </p>
  </Layout>
);

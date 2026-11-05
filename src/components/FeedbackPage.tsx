import type { FC } from "hono/jsx";
import { Layout } from "./Layout";
import type { Feedback } from "../db/types";

type FormErrors = {
  name?: string;
  message?: string;
  rating?: string;
};

type FormValues = {
  name?: string;
  email?: string;
  message?: string;
  rating?: string;
};

type FeedbackPageProps = {
  items: Feedback[];
  errors?: FormErrors;
  values?: FormValues;
};

export const FeedbackPage: FC<FeedbackPageProps> = ({ items, errors = {}, values = {} }) => (
  <Layout>
    <h1>משוב</h1>
    <p>ספרו איך היה הביקור במרפאה.</p>
    <form method="post" action="/feedback">
      <label>
        שם
        <input type="text" name="name" value={values.name ?? ""} required />
        {errors.name && <small>{errors.name}</small>}
      </label>
      <label>
        אימייל (לא חובה)
        <input type="email" name="email" value={values.email ?? ""} />
      </label>
      <label>
        מה תרצו לספר
        <textarea name="message" required>{values.message ?? ""}</textarea>
        {errors.message && <small>{errors.message}</small>}
      </label>
      <label>
        דירוג
        <input type="number" name="rating" min="1" max="5" value={values.rating ?? ""} required />
        <small>1 = עדיין מודאגים, 5 = החיה מרגישה טוב</small>
        {errors.rating && <small>{errors.rating}</small>}
      </label>
      <button type="submit">שליחת משוב</button>
    </form>
    <h2>מה אחרים כתבו</h2>
    {items.length === 0 ? (
      <p>עדיין אין משוב. אפשר להיות הראשונים.</p>
    ) : (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            <span> {item.rating}/5</span>
            <p>{item.message}</p>
          </li>
        ))}
      </ul>
    )}
  </Layout>
);

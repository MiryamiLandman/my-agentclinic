import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout";

type NotFoundProps = Record<string, never>;

export const NotFound: FC<NotFoundProps> = () => (
  <Layout>
    <article>
      <h1>העמוד לא נמצא</h1>
      <p>הכתובת הזו לא קיימת במרפאה.</p>
      <a href="/">חזרה לדף הבית</a>
    </article>
  </Layout>
);

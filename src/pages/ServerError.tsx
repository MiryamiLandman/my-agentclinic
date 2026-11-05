import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout";

type ServerErrorProps = Record<string, never>;

export const ServerError: FC<ServerErrorProps> = () => (
  <Layout>
    <article>
      <h1>משהו השתבש</h1>
      <p>נסו שוב מאוחר יותר.</p>
      <a href="/">חזרה לדף הבית</a>
    </article>
  </Layout>
);

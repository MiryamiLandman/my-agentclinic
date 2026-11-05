import type { FC } from "hono/jsx";
import { Layout } from "./Layout";

type AilmentRow = {
  id: number;
  name: string;
  description: string;
  therapies: string;
};

type AilmentsListProps = {
  ailments: AilmentRow[];
};

export const AilmentsList: FC<AilmentsListProps> = ({ ailments }) => (
  <Layout>
    <h1>תסמינים</h1>
    <table>
      <thead>
        <tr>
          <th scope="col">שם</th>
          <th scope="col">תיאור</th>
          <th scope="col">טיפול</th>
        </tr>
      </thead>
      <tbody>
        {ailments.map((ailment) => (
          <tr key={ailment.id}>
            <td>{ailment.name}</td>
            <td>{ailment.description}</td>
            <td>{ailment.therapies}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Layout>
);

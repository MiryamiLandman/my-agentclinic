import type { FC } from "hono/jsx";
import type { Ailment } from "../db/types";
import { Layout } from "./Layout";

type AilmentsListProps = {
  ailments: Ailment[];
};

export const AilmentsList: FC<AilmentsListProps> = ({ ailments }) => (
  <Layout>
    <h1>תסמינים</h1>
    <table>
      <thead>
        <tr>
          <th scope="col">שם</th>
          <th scope="col">תיאור</th>
        </tr>
      </thead>
      <tbody>
        {ailments.map((ailment) => (
          <tr key={ailment.id}>
            <td>{ailment.name}</td>
            <td>{ailment.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Layout>
);

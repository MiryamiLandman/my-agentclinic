import type { FC } from "hono/jsx";
import type { Therapy } from "../db/types";
import { Layout } from "./Layout";

type TherapiesListProps = {
  therapies: Therapy[];
};

export const TherapiesList: FC<TherapiesListProps> = ({ therapies }) => (
  <Layout>
    <h1>טיפולים</h1>
    <table>
      <thead>
        <tr>
          <th scope="col">שם</th>
          <th scope="col">תיאור</th>
        </tr>
      </thead>
      <tbody>
        {therapies.map((therapy) => (
          <tr key={therapy.id}>
            <td>
              <strong>{therapy.name}</strong>
            </td>
            <td>{therapy.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Layout>
);

import type { FC } from "hono/jsx";
import type { Animal } from "../db/types";
import { statusLabel } from "../labels";
import { Layout } from "./Layout";

type AnimalsListProps = {
  animals: Animal[];
};

export const AnimalsList: FC<AnimalsListProps> = ({ animals }) => (
  <Layout>
    <h1>חיות</h1>
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
  </Layout>
);

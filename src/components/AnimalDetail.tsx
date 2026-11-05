import type { FC } from "hono/jsx";
import type { Ailment, Animal } from "../db/types";
import { statusLabel } from "../labels";
import { Layout } from "./Layout";

type AnimalDetailProps = {
  animal: Animal;
  ailments: Ailment[];
};

export const AnimalDetail: FC<AnimalDetailProps> = ({ animal, ailments }) => (
  <Layout>
    <article>
      <h1>{animal.name}</h1>
      <p>
        <strong>מין:</strong> {animal.species}
      </p>
      <p>
        <strong>סטטוס:</strong> {statusLabel(animal.status)}
      </p>
      {ailments.length > 0 && (
        <>
          <h2>תסמינים</h2>
          <ul>
            {ailments.map((ailment) => (
              <li key={ailment.id}>
                <strong>{ailment.name}</strong> — {ailment.description}
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
    <p>
      <a href={`/animals/${animal.id}/appointments/new`}>קביעת תור</a>
    </p>
    <p>
      <a href="/animals">חזרה לחיות</a>
    </p>
  </Layout>
);

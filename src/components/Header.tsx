import type { FC } from "hono/jsx";

type HeaderProps = Record<string, never>;

export const Header: FC<HeaderProps> = () => (
  <header>
    <nav aria-label="ניווט ראשי">
      <a href="/">מרפאת החיות</a>
      <ul>
        <li>
          <a href="/animals">חיות</a>
        </li>
        <li>
          <a href="/ailments">תסמינים</a>
        </li>
        <li>
          <a href="/therapies">טיפולים</a>
        </li>
        <li>
          <a href="/dashboard">דשבורד</a>
        </li>
      </ul>
    </nav>
  </header>
);

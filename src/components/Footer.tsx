import { FC } from "hono/jsx";

export const Footer: FC = () => (
  <footer>
    <p>© {new Date().getFullYear()} מרפאת החיות</p>
  </footer>
);

import type { FC } from "hono/jsx";

type FooterProps = Record<string, never>;

export const Footer: FC<FooterProps> = () => (
  <footer>
    <p>© {new Date().getFullYear()} מרפאת החיות</p>
  </footer>
);

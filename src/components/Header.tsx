import type { FC } from "hono/jsx";

type HeaderProps = Record<string, never>;

export const Header: FC<HeaderProps> = () => (
  <header>
    <a href="/">מרפאת החיות</a>
  </header>
);

import { FC, PropsWithChildren } from "hono/jsx";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="he" dir="rtl">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>מרפאת החיות</title>
      <link rel="stylesheet" href="/static/style.css" />
    </head>
    <body>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </body>
  </html>
);

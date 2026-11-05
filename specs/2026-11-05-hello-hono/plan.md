# Phase 1 Plan — Hello Hono

Task groups in order. Each group can be checked on its own.

## Group 1 — Package Setup

1. Install `hono` at an exact version, with no `^`.
2. Install `@hono/node-server` at an exact version, so the app can listen on a port.
3. Install `tsx` as a dev dependency.
4. Keep `"strict": true` in `tsconfig.json`, and set `jsx` to `react-jsx` with `jsxImportSource` set to `hono/jsx`.

## Group 2 — Home Page

5. Replace `src/index.ts` with `src/index.tsx`, a small Hono app.
6. Create a JSX home page component, `src/pages/Home.tsx`.
7. The heading is "המרפאה פתוחה", with a short sentence under it about the pet clinic.
8. `GET /` returns that page as HTML, not a plain string.
9. The server listens on port 3000.

## Group 3 — Scripts

10. Add `"dev": "tsx watch src/index.tsx"` to `package.json`.
11. Add `"typecheck": "tsc --noEmit"`.

## Group 4 — Layout

12. Create `src/components/Layout.tsx`. It renders the document shell and composes three subcomponents.
13. Put `Header`, `Main`, and `Footer` in their own files: `src/components/Header.tsx`, `src/components/Main.tsx`, and `src/components/Footer.tsx`.
14. Create `static/style.css` and link it from the layout with `/static/style.css`.
15. Serve the `static/` directory from `src/index.tsx`.
16. Render the home page inside `Layout`. The heading stays "המרפאה פתוחה".

## Group 5 — Check

17. `npm run typecheck` exits with no errors.
18. `npm run dev` starts the server, and `http://localhost:3000` contains "המרפאה פתוחה", a header, a main, and a footer.
19. `http://localhost:3000/static/style.css` returns the stylesheet.

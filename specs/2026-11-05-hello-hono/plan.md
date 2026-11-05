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

## Group 4 — Check

12. `npm run typecheck` exits with no errors.
13. `npm run dev` starts the server, and `http://localhost:3000` contains "המרפאה פתוחה".

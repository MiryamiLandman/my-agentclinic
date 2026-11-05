# Phase 1 Validation — Hello Hono

The branch can be merged only when every item below is true.

## 1. TypeScript passes

```
npm run typecheck
```

The command exits with code 0 and no errors.

## 2. The server starts

```
npm run dev
```

The server starts without an error and listens on port 3000.

## 3. The page is in Hebrew

```
curl -s http://localhost:3000
```

The response is 200, and the body is HTML that contains the text `המרפאה פתוחה`.

## 4. The Hono version is pinned

In `package.json`, `hono` has no `^` and no `~`.

## 5. The layout and stylesheet are present

The home page HTML contains `<header`, `<main`, `<footer`, and a link to `/static/style.css`. `GET /static/style.css` returns 200.

`Header`, `Main`, and `Footer` are separate files under `src/components/`.

## 6. Strict TypeScript is on

`tsconfig.json` contains `"strict": true`.

## 7. Tests pass

```
npm test
```

The command exits with code 0.

## 8. The layout is mobile-first

`static/style.css` sets the compact spacing first and adds a `min-width: 640px` query for wider screens. The home page HTML includes `width=device-width`.

## Not required in this phase

- No CI
- No manual check of every screen size. The stylesheet and the viewport tag are enough for this phase.

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

## 5. Strict TypeScript is on

`tsconfig.json` contains `"strict": true`.

## Not required in this phase

- No automated tests
- No CI
- No manual check of visual design. It is enough that the page comes back with the heading.

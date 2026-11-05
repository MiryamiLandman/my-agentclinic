# Tech Stack

The pet clinic is a server-side TypeScript application. The browser receives finished HTML. The words on the screens are in Hebrew.

## Core

| Layer | Choice | Why |
|---|---|---|
| Language | TypeScript | Mary's requirement: a reliable site on a popular stack |
| Runtime | Node.js | Stable, with a large ecosystem |
| Server | **Hono** | Small, built for TypeScript, little configuration |
| Templates | Hono JSX on the server | Components are functions, with no React in the browser |
| Styling | Plain CSS and CSS custom properties | No extra build step. Steve gets a site that looks right in a modern browser |

## Why Hono

[Hono](https://hono.dev) fits this project better than Express or Fastify:

- TypeScript with no separate setup
- Built-in JSX for server-rendered HTML
- Simple middleware
- Runs on Node without changing the code

## Data

- **SQLite** through `better-sqlite3`. One local file, no separate database server.
- Migrations as SQL files. No ORM at this stage.

## Tooling

- `tsx` in development, so TypeScript runs without a build
- `tsc` for the production build

Brand colors are chosen in a later phase. They are not orange and black.

## What We Are Not Using

- No React, Vue, or Svelte in the browser
- No ORM
- No Docker at this stage

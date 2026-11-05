# Tech Stack

The pet clinic is a server-side TypeScript application. The browser receives finished HTML. The words on the screens are in Hebrew.

## Core

| Layer | Choice | Why |
|---|---|---|
| Language | TypeScript | Mary's requirement: a reliable site on a popular stack |
| Runtime | Node.js | Stable, with a large ecosystem |
| Server | **Hono** | Small, built for TypeScript, little configuration |
| Templates | Hono JSX on the server | Components are functions, with no React in the browser |
| Styling | Plain CSS and CSS custom properties | No extra build step. Mobile-first, so Steve's site works on a phone and a desktop |

## Why Hono

[Hono](https://hono.dev) fits this project better than Express or Fastify:

- TypeScript with no separate setup
- Built-in JSX for server-rendered HTML
- Simple middleware
- Runs on Node without changing the code

## Data

- **SQLite** through `better-sqlite3`. One local file, no separate database server.
- Migrations as SQL files. No ORM at this stage.

## Testing

- **Vitest** runs the checks. It understands TypeScript and the Hono app.
- Tests live in `tests/`.
- `npm test` must pass before a branch is merged.

## Tooling

- `tsx` in development, so TypeScript runs without a build
- `tsc` for the production build

## Brand colors

The clinic brand is teal and ink, not orange and black.

| Token | Value | Use |
|---|---|---|
| `--color-header` | `#0f766e` | Header background |
| `--color-header-text` | `#f8fffe` | Text on the header |
| `--color-text` | `#1c2b29` | Body text |
| `--color-bg` | `#f4fbf9` | Page background |

## CSS

Base styles target a narrow screen. A `min-width: 640px` query adds room on larger screens. Spacing, color, and type size live in the brand tokens above.

## What We Are Not Using

- No React, Vue, or Svelte in the browser
- No ORM
- No Docker at this stage

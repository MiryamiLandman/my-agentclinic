# Phase 1 Requirements — Hello Hono

## Scope

Install Hono with a `tsx` dev server. A single `/` route shows a Hebrew home page. TypeScript checks pass end to end.

## Out of Scope

- No animal pages and no navigation beyond the clinic name.
- No automated tests. Vitest comes later.
- No database and no other pages.
- No CI.

## Decisions

### Pin the Hono version

In `package.json`, the `hono` version is written with no `^` and no `~`. It is not upgraded silently.

### Strict TypeScript

`tsconfig.json` must include `"strict": true` from the first code commit of this phase.

### Layout files

`Header`, `Main`, and `Footer` each live in their own file. `Layout` only composes them and links `static/style.css`.

### Hebrew on the screen

The page heading is "המרפאה פתוחה". Under it, one short sentence: an owner sees the animal, the therapy, and books an appointment.

## Context

This phase only proves the baseline: Node runs TypeScript, Hono returns a page, and the dev loop works.

## Stakeholders

- **Mary** needs TypeScript end to end. That holds when `strict` is on and `tsc --noEmit` passes.
- **Steve** does not get a design yet. This phase is the plumbing and one readable page.

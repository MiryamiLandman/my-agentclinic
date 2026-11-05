# Phase 2 Plan — Animals and Ailments

Task groups in order.

## Group 1 — Database

1. Install `better-sqlite3` and `@types/better-sqlite3`.
2. Add `src/db` with `createDb`, `migrate`, and `seed`.
3. Migration `001_create_animals.sql`: `id`, `name`, `species`, `status` (`active`, `on_leave`, `discharged`).
4. Migration `002_create_ailments.sql`: `id`, `name`, `description`.
5. Migration `003_create_animal_ailments.sql` linking an animal to an ailment.
6. Seed six example animals and four Hebrew ailments. `npm run seed` applies migrations and the seed.

## Group 2 — Animals

7. `GET /animals` lists every animal: name, species, and a Hebrew status.
8. `GET /animals/:id` shows one animal and its ailments. An unknown id returns 404.
9. The header links to `/animals`.

## Group 3 — Ailments

10. `GET /ailments` lists every ailment name and description.
11. The header links to `/ailments`.

## Group 4 — Check

12. `npm test` and `npm run typecheck` pass.
13. The new pages render inside the existing layout and stay in Hebrew.

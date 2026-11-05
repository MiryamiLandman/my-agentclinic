# Plan: Feedback

## 1. Database

1. Add `src/db/migrations/007_create_feedback.sql` with `id`, `name`, `email`, `message`, `rating` (1–5), and `created_at`.
2. Add a `Feedback` type in `src/db/types.ts`.
3. Seed three owner notes in `src/db/seed.ts`.

## 2. Page

4. Add a Hebrew form and a list on one page: name, optional email, message, and a rating from 1 to 5.
5. Add `GET /feedback` and `POST /feedback`.
6. On success, redirect back to `/feedback`.
7. On a bad post, show the Hebrew error and keep the typed values.
8. Strip HTML from the text fields before saving.
9. Add a משוב link in the header.

## 3. Checks

10. Cover the list, a valid post, a post with no name, and a rating outside 1–5.

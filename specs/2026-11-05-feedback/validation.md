# Validation: Feedback

## Commands

- `npm test` exits 0
- `npm run typecheck` exits 0

## Page

- `GET /feedback` returns 200 and contains משוב
- The page shows a seeded note
- The header links to `/feedback`
- `POST /feedback` with a name, a message, and a rating of 5 redirects to `/feedback`
- `POST /feedback` with no name returns 400 and contains יש להזין שם
- `POST /feedback` with a rating of 9 returns 400 and does not add a row

# Phase 2 Validation — Animals and Ailments

## 1. Tests and types

`npm test` and `npm run typecheck` exit with code 0.

## 2. Animal list

`GET /animals` returns 200 and HTML that contains `חיות` and at least one seeded name, `נועה`.

## 3. Animal card

`GET /animals/1` returns 200 and HTML that contains the animal's name, species, Hebrew status, and at least one ailment.

`GET /animals/9999` returns 404.

## 4. Ailments

`GET /ailments` returns 200 and HTML that contains `תסמינים` and `צליעה`.

## 5. Navigation

The home page HTML contains links to `/animals` and `/ailments`.

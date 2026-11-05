# MVP Validation

## 1. Tests and types

`npm test` and `npm run typecheck` exit with code 0.

## 2. Therapies

`GET /therapies` returns 200 and contains `טיפולים` and `מנוחה וקיבוע`.

`GET /ailments` mentions `מנוחה וקיבוע` next to צליעה.

## 3. Booking

`GET /animals/1` contains a link to `/animals/1/appointments/new`.

Posting an empty form returns the form again with `יש להזין שם וטרינר`.

Posting a future vet, date, and time redirects to a confirmation page that contains the vet name.

## 4. Dashboard

`GET /dashboard` returns 200 and contains `דשבורד` and `נועה`.

## 5. Errors and focus

`GET /missing` returns 404 and contains `העמוד לא נמצא`.

`static/style.css` contains `:focus-visible`.

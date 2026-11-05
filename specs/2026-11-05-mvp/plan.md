# MVP Plan

The remaining roadmap phases, in order.

## Therapies

1. Add `therapies` and `ailment_therapies` tables.
2. Seed Hebrew therapies and link each ailment to one therapy.
3. `GET /therapies` lists them.
4. The ailments page shows the matching therapy next to each ailment.

## Appointments

5. Add an `appointments` table: animal, vet name, date and time, status.
6. From an animal card, open a Hebrew booking form.
7. Reject an empty vet name, date, or time, and reject a time that is not in the future.
8. Strip HTML from the vet name.
9. A successful booking redirects to a confirmation page.

## Dashboard

10. `GET /dashboard` shows counts for animals, open appointments, and ailments linked to animals in treatment.
11. Show tables for animals, open appointments, and ailments.

## Polish and errors

12. Keep new pages inside the existing mobile-first layout.
13. Add a visible `:focus-visible` outline.
14. `404` and `500` pages in Hebrew.
15. Log method, path, status, and duration for each request.

## Check

16. `npm test` and `npm run typecheck` pass.

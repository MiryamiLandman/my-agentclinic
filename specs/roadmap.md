# Roadmap

Each phase is small enough to build, check, and save on its own.

The words on the screens are in Hebrew.

---

## Phase 1 — Hello Hono ✅
- Install Hono and a `tsx` dev server
- One `/` route that shows "המרפאה פתוחה"
- Confirm TypeScript types work end to end

## Phase 2 — Animals and Ailments ✅
- Navigation links in the header. The header, main, and footer already exist.
- SQLite and a first migration for an `animals` table
- A handful of example animals
- An `/animals` page listing all of them
- An `/animals/:id` page with name, species, status, and the ailments the animal came in with
- An `ailments` table and seed data, for example "limping" or "skin rash"
- An `/ailments` page
- A link from an animal to one or more ailments

## Phase 3 — Therapies Catalog ✅
- A `therapies` table and seed data
- A `/therapies` page
- A link from an ailment to the therapies that fit it

## Phase 4 — Appointment Booking ✅
- An `appointments` table: animal, vet, date and time, status
- A booking form on the animal's page
- Input checks and a confirmation page

## Phase 5 — Staff Dashboard ✅
- A `/dashboard` page with counts: animals, open appointments, active ailments
- Simple tables for staff
- Mary's dashboard exists

## Phase 6 — Polish and Accessibility ✅
- Check that every later page keeps the mobile-first layout from the base stylesheet
- A semantic HTML pass
- Keyboard navigation and a visible focus style

## Phase 7 — Hardening ✅
- 404 and 500 pages
- Input sanitizing on every form
- Basic logging middleware

## Phase 8 — Feedback
Taken from `TODO.md` after the MVP was already running.

- A `feedback` table and a few owner notes
- A `/feedback` page with a form and the notes already sent
- A משוב link in the header

## Phase 9 — About the clinic
- An `/about` page with the clinic address
- A link in the header

## Phase 10 — Owner reviews
- A `reviews` table
- A `/reviews` page where an owner can leave a short review

---

Later phases, not planned yet: sign-in, email, a vet profile page, reports.

# Requirements: About the clinic

## Scope

A static page at `/about`. It tells an owner where the clinic is. No form, no database, no map.

The page shows, in this order:

| Section | On screen |
|---|---|
| Heading | אודות |
| One sentence | בעל חיה רואה את החיה, את הטיפול, וקובע תור. |
| Address | רחוב הכלניות 12, חיפה |
| Hours | ראשון עד חמישי, 08:00–19:00. שישי, 08:00–13:00. |
| Vets | ד״ר לוי וד״ר כהן |

The header gains a link labeled אודות pointing at `/about`.

## Decisions

- The copy is hardcoded in one page component, the same way the home page is hardcoded.
- No migration and no seed.
- No map. The roadmap item for this phase is the address itself.
- The two vet names are the ones already stored on appointments.

## Context

Taken from phase 9 of `specs/roadmap.md`, `specs/mission.md`, and `specs/tech-stack.md`. Specs stay in English. The words on the page are Hebrew. The brand stays teal and ink. No new dependency.

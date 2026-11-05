# MVP Requirements

## Scope

Finish the clinic a visitor and a staff member can use: therapies, booking, a dashboard, and error pages. Screen text stays Hebrew.

## Out of Scope

- No sign-in, email, or vet profile page.
- No editing or deleting existing rows except creating an appointment.

## Decisions

- A therapy is linked to an ailment in `ailment_therapies`.
- Appointment status is stored as `pending`, `confirmed`, or `cancelled`, and shown as ממתין, אושר, or בוטל.
- The vet name is plain text. Tags are removed before it is saved.
- An appointment must be in the future.
- Unknown URLs render the Hebrew 404 page inside the layout.

## Context

Animals and ailments already exist. This phase adds the rest of the roadmap through hardening.

# Phase 2 Requirements — Animals and Ailments

## Scope

SQLite stores animals and ailments. Staff can open a list of animals, one animal's card, and a list of ailments. The words on these screens are Hebrew.

## Out of Scope

- No therapies, appointments, or dashboard. Those are later phases.
- No sign-in.
- No editing forms. The rows come from the seed.

## Decisions

### Status values

The database stores `active`, `on_leave`, and `discharged`. The screen shows בטיפול, בחופשה, and שוחרר.

### Species

An animal has a species, such as כלב or חתול, instead of a model name.

### Example data

Six animals and four ailments: צליעה, פריחה בעור, חוסר תיאבון, and נשירת נוצות. Each animal links to one or more ailments.

## Context

Phase 1 already serves the Hebrew home page inside the teal layout. This phase fills the navigation that the roadmap left for animals and ailments.

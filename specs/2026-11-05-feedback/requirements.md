# Requirements: Feedback

## Scope

A public page at `/feedback`. An owner leaves a note about a visit. The same page lists every note.

| Field | Required | Notes |
|---|---|---|
| name | yes | The owner's name |
| email | no | Stored empty when omitted |
| message | yes | The note |
| rating | yes | Whole number from 1 to 5 |

The screen copy is Hebrew. Specs stay in English.

## Decisions

- Same stack as `specs/tech-stack.md`. No new dependency.
- SQL stays in the route file, the same way appointments are saved.
- A successful post redirects to `GET /feedback`, so a reload does not send the note again.
- A failed post returns 400 and the form, with a Hebrew message.
- Tags in the name, email, and message are removed before saving.
- Seed three notes so the list is not empty on a fresh database.

## Context

The MVP pages already exist. This is the next small phase from `TODO.md`. Owners and staff are unchanged. The brand stays teal and ink.

---
name: feature-spec
description: Starts the next pet-clinic phase from specs/roadmap.md, creates a git branch, and writes specs/YYYY-MM-DD-name/ with plan.md, requirements.md, and validation.md. Use when the user says "feature spec", "next phase", "start the next feature", or asks for a feature spec.
---

# Feature Spec

## Workflow

### 1. Find the next phase

Read `specs/roadmap.md`. The next phase is the first `## Phase` heading that does not contain ✅. Use that name for the branch and the directory.

### 2. Create the branch

```bash
git checkout -b phase-N-<kebab-name>
```

### 3. Confirm scope before writing files

Ask three things in one turn, and wait:

| Topic | Ask |
|---|---|
| Scope | What the page collects, shows, or stores |
| Decisions | Storage, validation, and how the page behaves |
| Context | Copy, constraints, and anything the stack must not change |

If the user already said to continue from the roadmap, use that phase's bullets plus `specs/mission.md` and `specs/tech-stack.md`. Do not open another question form.

### 4. Read the constitution

Read `specs/mission.md` and `specs/tech-stack.md` before drafting.

### 5. Write the spec

Create `specs/YYYY-MM-DD-<feature-name>/` with today's date.

`requirements.md` has Scope, Decisions, and Context. Specs are in English. Any words that will appear on screen are written in Hebrew inside the spec.

`plan.md` is numbered task groups. Each group can be built on its own.

`validation.md` lists the commands that must pass, the assertions a test must make, and a short manual check.

## Constraints

- Stay inside `specs/tech-stack.md`. Do not add a dependency unless the user asks.
- Follow the route and component patterns already in the repo.
- Keep the brand teal and ink.
- Ship one roadmap phase only.

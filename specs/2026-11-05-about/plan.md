# Plan: About the clinic

No database work. The page is static.

## 1. Page

1. Add `src/pages/About.tsx`.
2. Wrap it in `Layout`.
3. Render the heading, the one sentence, the address, the hours, and the two vet names from the requirements.

## 2. Route

4. Add `src/routes/about.tsx` with `GET /` rendering that page. It does not take a database.
5. Register it in `src/app.tsx` as `app.route("/about", aboutRouter())`.

## 3. Navigation

6. Add an אודות link to `src/components/Header.tsx`.

## 4. Checks

7. Request `GET /about` and expect 200, the heading, the address, and the header link.

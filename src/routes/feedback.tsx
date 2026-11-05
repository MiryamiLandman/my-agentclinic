import type Database from "better-sqlite3";
import { Hono } from "hono";
import { FeedbackPage } from "../components/FeedbackPage";
import type { Feedback } from "../db/types";

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, "").trim();
}

export function feedbackRouter(db: Database.Database) {
  const router = new Hono();
  const selectAll = db.prepare("SELECT * FROM feedback ORDER BY created_at DESC, id DESC");
  const insertNote = db.prepare(
    "INSERT INTO feedback (name, email, message, rating) VALUES (?, ?, ?, ?)",
  );

  router.get("/", (c) => {
    const items = selectAll.all() as Feedback[];
    return c.html(<FeedbackPage items={items} />);
  });

  router.post("/", async (c) => {
    const body = await c.req.parseBody();
    const name = stripHtml(String(body.name ?? ""));
    const email = stripHtml(String(body.email ?? ""));
    const message = stripHtml(String(body.message ?? ""));
    const ratingRaw = String(body.rating ?? "").trim();
    const rating = Number(ratingRaw);
    const errors: { name?: string; message?: string; rating?: string } = {};

    if (!name) errors.name = "יש להזין שם";
    if (!message) errors.message = "יש להזין משוב";
    if (!ratingRaw || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      errors.rating = "הדירוג חייב להיות מספר שלם בין 1 ל-5";
    }

    if (Object.keys(errors).length > 0) {
      const items = selectAll.all() as Feedback[];
      return c.html(
        <FeedbackPage
          items={items}
          errors={errors}
          values={{ name, email, message, rating: ratingRaw }}
        />,
        400,
      );
    }

    insertNote.run(name, email || null, message, rating);
    return c.redirect("/feedback");
  });

  return router;
}

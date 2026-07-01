import { Router } from "express";
import { z } from "zod";

const router = Router();

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("A valid email is required"),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

// Lightweight in-memory rate limit: 5 submissions per 15 min per IP.
// Guards the Resend send from bot spam without adding a dependency.
// Requires `app.set("trust proxy", ...)` upstream so req.ip is the real client IP.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of hits) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) hits.delete(ip);
    else hits.set(ip, recent);
  }
}, WINDOW_MS).unref();

function rateLimit(req, res, next) {
  const now = Date.now();
  const timestamps = (hits.get(req.ip) ?? []).filter(
    (t) => now - t < WINDOW_MS,
  );
  if (timestamps.length >= MAX_REQUESTS) {
    return res
      .status(429)
      .json({ error: "Too many messages sent. Please try again later." });
  }
  timestamps.push(now);
  hits.set(req.ip, timestamps);
  next();
}

router.post("/", rateLimit, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(422)
      .json({ error: parsed.error.issues[0]?.message ?? "Invalid input." });
  }

  const { name, email, message } = parsed.data;
  let emailed = false;

  // Send notification email (if Resend is configured)
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL ?? "raiaayushrai2005@gmail.com"],
        replyTo: email,
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
      if (!error) emailed = true;
    } catch (err) {
      console.error("[contact] Email send failed:", err.message);
    }
  }

  if (emailed) {
    return res.json({ ok: true, emailed });
  }

  // Nothing configured → let the client fall back to a mailto link.
  return res
    .status(501)
    .json({ fallback: true, error: "No delivery method configured." });
});

export default router;

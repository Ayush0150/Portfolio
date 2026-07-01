import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import contactRouter from "./routes/contact.js";

const app = express();

// Render/Railway/Heroku sit behind a reverse proxy — trust the first hop so
// req.ip resolves to the real client IP (X-Forwarded-For) instead of the
// proxy's address. Required for the contact route's per-IP rate limit.
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : true,
  }),
);
app.use(express.json());

app.get("/", (_req, res) =>
  res.json({ status: "ok", service: "ayush-portfolio-api" }),
);
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/contact", contactRouter);

const PORT = process.env.PORT || 5050;

connectDB(process.env.MONGODB_URI).finally(() => {
  app.listen(PORT, () =>
    console.log(`[server] Listening on http://localhost:${PORT}`),
  );
});

# Ayush Rai — Portfolio (MERN)

A premium, dark-mode portfolio for **Ayush Rai — Full Stack Developer (MERN)**, built
entirely on the **MERN stack**:

- **MongoDB** + **Mongoose** — stores contact messages
- **Express** — REST API (`/api/contact`)
- **React** (Vite + TypeScript) — the SPA front-end
- **Node.js** — the server runtime

Animations use **Framer Motion**; styling is **Tailwind CSS v4**.

## Structure

```
.
├── client/   # Vite + React SPA (React Router, Framer Motion, Tailwind)
└── server/   # Express + MongoDB API (Mongoose, Zod)
```

## Getting started

```bash
# install both packages
npm run install:all

# terminal 1 — API (http://localhost:5000)
npm run dev:server

# terminal 2 — client (http://localhost:5173)
npm run dev:client
```

The Vite dev server proxies `/api` → `http://localhost:5000`, so the contact
form works locally end-to-end.

## Environment

**server/.env** (copy from `server/.env.example`)

| Var              | Purpose                                                    |
| ---------------- | ---------------------------------------------------------- |
| `PORT`           | API port (default 5000)                                    |
| `MONGODB_URI`    | MongoDB connection string (e.g. Atlas). Optional locally.  |
| `CLIENT_URL`     | Allowed CORS origin(s)                                     |
| `RESEND_API_KEY` | Optional — emails new messages to your inbox via Resend    |
| `CONTACT_EMAIL`  | Inbox that receives messages                               |

**client/.env** (copy from `client/.env.example`)

| Var            | Purpose                                                    |
| -------------- | ---------------------------------------------------------- |
| `VITE_API_URL` | API base URL in production (empty in dev — Vite proxies)   |

> The contact form saves to MongoDB and (optionally) emails you. With neither
> configured, it gracefully falls back to opening the visitor's mail client.

## Personalize

Content lives in `client/src/lib/data/` (`site.ts`, `skills.ts`, `experience.ts`,
`projects.ts`). Design tokens are in `client/src/index.css` (`@theme`).
Drop your résumé at `client/public/Ayush_Rai_Resume.pdf`.

## Build & deploy

```bash
npm run build            # builds client/dist
```

- **Client** → any static host (Vercel, Netlify, Render Static). Set `VITE_API_URL`.
- **Server** → Node host (Render, Railway). Set `MONGODB_URI`, `CLIENT_URL`, etc.

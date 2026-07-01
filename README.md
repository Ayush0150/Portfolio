# Ayush Rai — Portfolio (MERN)

A premium, dark-mode portfolio for **Ayush Rai — Full Stack Developer (MERN)**.

- **React** (Vite + JavaScript/JSX) — the SPA front-end, React Router
- **Express** — REST API (`/api/contact`)
- **Node.js** — the server runtime

Animations use **Framer Motion**; styling is **Tailwind CSS v4**.

## Structure

```
.
├── client/   # Vite + React SPA (React Router, Framer Motion, Tailwind)
└── server/   # Express API (Zod validation, Resend email)
```

## Getting started

```bash
# install both packages
npm run install:all

# terminal 1 — API (http://localhost:5050)
npm run dev:server

# terminal 2 — client (http://localhost:5173)
npm run dev:client
```

The Vite dev server proxies `/api` → `http://localhost:5050`, so the contact
form works locally end-to-end.

## Environment

**server/.env** (copy from `server/.env.example`)

| Var              | Purpose                                                    |
| ---------------- | ---------------------------------------------------------- |
| `PORT`           | API port (default 5050)                                    |
| `CLIENT_URL`     | Allowed CORS origin(s)                                     |
| `RESEND_API_KEY` | Optional — emails new messages to your inbox via Resend    |
| `CONTACT_EMAIL`  | Inbox that receives messages                               |

**client/.env** (copy from `client/.env.example`)

| Var            | Purpose                                                    |
| -------------- | ---------------------------------------------------------- |
| `VITE_API_URL` | API base URL in production (empty in dev — Vite proxies)   |

> The contact form emails you via Resend when configured; otherwise it falls
> back to opening the visitor's mail client (mailto). No database is used.

## Personalize

Content lives in `client/src/lib/data/` (`site.js`, `skills.js`, `experience.js`,
`projects.js`). Design tokens are in `client/src/index.css` (`@theme`).
Résumé lives at `client/public/Resume.pdf`.

## Build & deploy

```bash
npm run build            # builds client/dist
```

- **Client** → static host (Vercel, Netlify, Render Static). Set `VITE_API_URL`
  to the deployed server's URL. `client/vercel.json` and `client/public/_redirects`
  handle SPA route fallbacks on Vercel/Netlify; `render.yaml` covers Render.
- **Server** → Node host (Render, Railway). Set `CLIENT_URL` to the deployed
  client's URL, plus `RESEND_API_KEY`/`CONTACT_EMAIL` if you want email
  notifications.

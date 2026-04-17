# Innovat Bharat — 2026 Web Platform

The official website and API for **Innovat Bharat** — bridging education and industry in rural India.

Built with Angular (frontend SPA) and Express.js (backend API), the platform provides information about programs, the Innovat Bharat ecosystem, and multiple contact/interest forms that route submissions to the team via email and Google Sheets.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21 (standalone components, lazy-loaded routes) |
| Backend | Express 5, Node.js |
| Email | [Resend](https://resend.com) |
| Data logging | Google Sheets API (via Service Account) |
| Deployment — frontend | Render (static) · Netlify · Vercel |
| Deployment — API | Render (Node web service) |

---

## Project Structure

```
ib-2026/
├── src/
│   ├── app/
│   │   ├── pages/          # One directory per route (lazy-loaded)
│   │   ├── components/     # Shared UI components
│   │   ├── services/       # Angular services
│   │   └── app.routes.ts   # Client-side routing
│   ├── assets/             # Static assets
│   └── environments/       # Environment configs
├── server/
│   └── index.js            # Express API server
├── angular.json
├── package.json
├── render.yaml             # Render deployment config
├── netlify.toml            # Netlify deployment config
└── vercel.json             # Vercel deployment config
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About Innovat Bharat |
| `/ecosystem` | The IB Ecosystem |
| `/programs` | Programs offered |
| `/for-colleges` | Information for colleges |
| `/for-students-parents` | Information for students & parents |
| `/partners-mentors` | Partner & mentor opportunities |
| `/resources` | Resources |
| `/contact` | Contact / college invite form |

---

## API Endpoints

All API routes are served by the Express server (`server/index.js`).

### `GET /health`
Returns `{ "status": "ok" }`. Used as a health-check by Render.

### `POST /api/contact`
College invite request form.

**Required fields:** `name`, `email`, `collegeName`, `phone`  
**Optional fields:** `designation`, `location`, `preferredDateTime`, `message`

### `POST /api/partner`
Partner / mentor interest form and general community message form.

**Required fields:** `name`, `email`  
**Optional fields:** `phone`, `type`, `role`, `expertise`, `message`

### `POST /api/newsletter`
Newsletter subscription.

**Required fields:** `email`

All three endpoints:
1. Append a timestamped row to the relevant Google Sheet tab (`Contact`, `Partner`, or `Newsletter`)
2. Send a notification email to the IB team
3. Send an acknowledgement email to the submitter

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install dependencies

```bash
npm install
```

### Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

See [Environment Variables](#environment-variables) for details.

### Run in development

```bash
npm run dev
```

This uses `concurrently` to start both:
- the Express API server on `http://localhost:3000`
- the Angular dev server on `http://localhost:4200`

Requests from the Angular dev server are proxied to the API via `proxy.conf.json`.

### Build for production

```bash
npm run build
```

Output is written to `dist/demo/browser/`.

---

## Environment Variables

Copy `.env.local.example` to `.env.local` for local development. **Never commit real keys.**

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com). Free tier: 100 emails/day. |
| `IB_TEAM_EMAIL` | Email address that receives all form submissions (e.g. `info@innovatbharat.org`). |
| `IB_FROM_EMAIL` | Verified sender domain used in outgoing emails. Use `onboarding@resend.dev` locally. |
| `ALLOWED_ORIGIN` | CORS origin — your frontend URL (e.g. `https://innovat-bharat-web.onrender.com`). Use `http://localhost:4200` locally. |
| `PORT` | Express server port (default `3000`; Render sets this automatically). |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account email with Google Sheets access. |
| `GOOGLE_PRIVATE_KEY` | Private key for the service account (PEM or JSON string). |
| `GOOGLE_SHEET_ID` | ID (or full URL) of the Google Spreadsheet used for form submissions. |

---

## Deployment

### Render (recommended)

The `render.yaml` file defines two services:

| Service | Type | Description |
|---------|------|-------------|
| `innovat-bharat-web` | Static site | Builds the Angular app and serves `dist/demo/browser/` with SPA rewrites. |
| `innovat-bharat-api` | Node web service | Runs `node server/index.js`; health-check at `/health`. |

Set the secret environment variables (`RESEND_API_KEY`, email vars, Google credentials, `ALLOWED_ORIGIN`) manually in the Render dashboard.

### Netlify

`netlify.toml` builds with `npx ng build` and publishes `dist/demo/browser/` with a catch-all redirect to `index.html`. Deploy the static site only; point `ALLOWED_ORIGIN` to your Render API URL.

### Vercel

`vercel.json` targets the Angular framework, builds to `dist/demo/browser/`, and rewrites all paths to `index.html`. Deploy the static site only.

---

## Contact

**Innovat Bharat** · [innovatbharat.org](https://innovatbharat.org) · info@innovatbharat.org

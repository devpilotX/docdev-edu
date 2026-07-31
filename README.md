# DarkDev EDU

[![CI](https://github.com/devpilotX/docdev-edu/actions/workflows/ci.yml/badge.svg)](https://github.com/devpilotX/docdev-edu/actions/workflows/ci.yml)
[![CodeQL](https://github.com/devpilotX/docdev-edu/actions/workflows/codeql.yml/badge.svg)](https://github.com/devpilotX/docdev-edu/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-black.svg)](LICENSE)

The institute website and admissions enquiry platform for **DarkDev EDU**, an
institute of technology and applied sciences. It is a complete, production-shaped
application: a public prospectus, a validated enquiry pipeline backed by
PostgreSQL, and an authenticated admissions console with an audit trail and CSV
export.

---

## Contents

- [Stack](#stack)
- [Architecture](#architecture)
- [Getting started](#getting-started)
- [Environment](#environment)
- [Scripts](#scripts)
- [Enquiry API](#enquiry-api)
- [Admissions console](#admissions-console)
- [Design system](#design-system)
- [Testing](#testing)
- [Continuous integration](#continuous-integration)
- [Deployment](#deployment)
- [Project structure](#project-structure)
- [Licence](#licence)

---

## Stack

| Layer          | Choice                                   | Why                                                                 |
| -------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| Framework      | Next.js 15, App Router, React 19          | Server components by default, streaming, first-class route handlers |
| Language       | TypeScript 5 in `strict` mode             | `noUncheckedIndexedAccess` and no implicit `any` anywhere            |
| Styling        | Tailwind CSS v4 with CSS-first tokens     | One token layer in `globals.css`; no runtime CSS-in-JS cost          |
| Forms          | React Hook Form + Zod                     | Uncontrolled inputs, one schema shared by the client and the server  |
| Database       | PostgreSQL 16                             | Relational integrity for enquiries and their audit trail             |
| ORM            | Prisma 6                                  | Typed queries and reviewable migrations                              |
| Authentication | HMAC-signed cookie sessions, scrypt hashes| No third-party identity dependency for a single-operator console     |
| Testing        | Vitest (unit), Playwright (end-to-end)    | Fast domain tests plus real browser coverage of the enquiry journey  |
| Tooling        | ESLint 9 flat config, Prettier            | Enforced in CI, not by convention                                    |
| Delivery       | GitHub Actions, Docker (standalone build) | Reproducible checks and a small runtime image                        |

No AI services, no tracking scripts, no third-party analytics.

## Architecture

```
Browser
  └─ Next.js App Router (React Server Components)
       ├─ Public prospectus            src/app/(routes)
       ├─ Enquiry form (client island) src/components/inquiry
       └─ Route handlers               src/app/api
            ├─ Zod validation          src/lib/inquiry.ts
            ├─ Rate limiting           src/lib/rate-limit.ts
            ├─ Persistence (Prisma)    src/lib/db.ts  ──▶ PostgreSQL
            └─ Optional mirror         src/lib/forward-inquiry.ts ──▶ external endpoint
```

Editorial content (programmes, faculty, research, news, events) is typed data in
`src/content`, so every change to the prospectus goes through code review. The
database holds only what the public writes: enquiries and their audit events.

An enquiry is durable in PostgreSQL **before** any outbound delivery is
attempted. A downstream outage degrades to a queued record and a logged event; it
never loses a prospective student.

## Getting started

**Requirements:** Node.js 22 (see `.nvmrc`), npm 10+, Docker or a local
PostgreSQL 16 instance.

```bash
git clone https://github.com/devpilotX/docdev-edu.git
cd docdev-edu
npm install

cp .env.example .env.local
docker compose up -d          # PostgreSQL 16 on localhost:5432

npm run db:push               # create the schema
npm run db:seed               # optional sample enquiries

npm run dev                   # http://localhost:3000
```

To sign in to the console, generate a password hash and copy it into `.env.local`:

```bash
npx tsx scripts/hash-password.ts "your-strong-password"
```

## Environment

| Variable                       | Required     | Default      | Purpose                                              |
| ------------------------------ | ------------ | ------------ | ---------------------------------------------------- |
| `DATABASE_URL`                 | yes          | —            | PostgreSQL connection string                          |
| `NEXT_PUBLIC_SITE_URL`         | yes          | `http://localhost:3000` | Canonical origin for metadata, sitemap and robots |
| `SESSION_SECRET`               | yes          | —            | HMAC key for admin session cookies                    |
| `ADMIN_EMAIL`                  | for console  | —            | Admissions console account                            |
| `ADMIN_PASSWORD_HASH`          | for console  | —            | scrypt hash produced by `scripts/hash-password.ts`    |
| `INQUIRY_WEBHOOK_URL`          | no           | —            | Optional endpoint that receives a copy of each enquiry |
| `INQUIRY_WEBHOOK_HEADER_NAME`  | no           | `x-api-key`  | Header used to authenticate the mirror request        |
| `INQUIRY_WEBHOOK_HEADER_VALUE` | no           | —            | Shared secret for that header                         |
| `INQUIRY_RATE_LIMIT_MAX`       | no           | `5`          | Submissions allowed per window, per client            |
| `INQUIRY_RATE_LIMIT_WINDOW_MS` | no           | `600000`     | Window length in milliseconds                         |

Secrets are read lazily, so a production build never fails because a runtime-only
value is absent on the build machine.

## Scripts

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `npm run dev`         | Development server                            |
| `npm run build`       | Production build (standalone output)          |
| `npm start`           | Serve the production build                    |
| `npm run lint`        | ESLint across the repository                  |
| `npm run typecheck`   | `tsc --noEmit`                                |
| `npm run format`      | Prettier write                                |
| `npm test`            | Vitest unit suite                             |
| `npm run test:e2e`    | Playwright end-to-end suite                   |
| `npm run db:push`     | Apply the Prisma schema to the database       |
| `npm run db:migrate`  | Create and apply a migration                  |
| `npm run db:seed`     | Insert sample enquiries                       |
| `npm run db:studio`   | Browse the database                           |

## Enquiry API

### `POST /api/inquiries`

Public, rate limited, no authentication.

```jsonc
{
  "name": "Ananya Sharma",
  "email": "ananya@example.com",
  "phone": "98765 43210",
  "programme": "BSc Computer Science",
  "intake": "Autumn 2026",
  "message": "Please send the application deadline and the fee structure.",
  "source": "website-form",
  "consent": true
}
```

| Field       | Type    | Rules                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| `name`      | string  | 2–120 characters                                              |
| `email`     | string  | Valid address, lower-cased on storage                         |
| `phone`     | string  | 6–24 characters, normalised to E.164 where an Indian mobile   |
| `programme` | string  | A published programme title, or `Not decided yet`             |
| `intake`    | string  | A published intake label                                      |
| `message`   | string  | 10–2000 characters                                            |
| `source`    | string  | `website-form`, `prospectus`, `open-day`, `referral`, `api`   |
| `consent`   | boolean | Must be `true`                                                |
| `company`   | string  | Honeypot. Must be empty; a filled value is silently discarded |

**Responses**

| Status | Body                                                | Meaning                          |
| ------ | --------------------------------------------------- | -------------------------------- |
| `201`  | `{ reference, status, priority, receivedAt }`        | Accepted and stored              |
| `400`  | `{ message }`                                        | Body was not valid JSON          |
| `422`  | `{ message, fieldErrors }`                           | Validation failed, per field     |
| `429`  | `{ message }` with `Retry-After`                     | Rate limit exceeded              |
| `503`  | `{ message }`                                        | Could not allocate a reference   |

Each accepted enquiry is triaged into `HOT`, `WARM` or `NURTURE` by an explicit,
inspectable rule in `src/lib/inquiry.ts`, and given a human-quotable reference in
the form `DDE-2026-7KQ4M2`.

### Mirroring to an external system

When `INQUIRY_WEBHOOK_URL` is set, each accepted enquiry is also POSTed to that
endpoint with a stable, integration-friendly body:

```json
{
  "enquiry_id": "DDE-2026-7KQ4M2",
  "name": "Ananya Sharma",
  "email": "ananya@example.com",
  "phone": "+919876543210",
  "course": "BSc Computer Science",
  "intake": "Autumn 2026",
  "message": "…",
  "source": "website-form",
  "consent": true,
  "received_at": "2026-07-31T13:24:05.000Z"
}
```

The request carries the configured authentication header, times out after five
seconds, and records a `FORWARDED` or `FORWARD_FAILED` audit event either way.
The visitor's submission is never blocked by the outcome.

### Authenticated endpoints

| Endpoint                    | Method  | Description                                  |
| --------------------------- | ------- | -------------------------------------------- |
| `/api/inquiries`            | `GET`   | Filtered queue read (`status`, `priority`, `q`, `limit`) |
| `/api/inquiries/{id}`       | `GET`   | Single enquiry with its audit trail           |
| `/api/inquiries/{id}`       | `PATCH` | Update status or priority, or append a note   |
| `/api/inquiries/export`     | `GET`   | RFC 4180 CSV export                           |
| `/api/health`               | `GET`   | Liveness and database readiness probe         |

## Admissions console

`/admin` is protected by middleware and an HMAC-signed, `HttpOnly`, `SameSite=Lax`
session cookie. Passwords are stored as scrypt hashes with a per-password salt and
verified in constant time; the middleware only checks for cookie presence, so the
signing secret never reaches the edge runtime.

The console provides the enquiry queue with search and status filters, a detail
view with the full audit trail, status, priority and note updates, and a CSV
export. Every mutation writes an append-only `InquiryEvent` recording who changed
what and when.

## Design system

The visual language is deliberately restrained: one ink colour, one accent, a
serif for display and the system sans for everything else.

| Token           | Value     | Use                       |
| --------------- | --------- | ------------------------- |
| `--color-ink`   | `#0E1116` | Headings, primary buttons |
| `--color-muted` | `#6F7378` | Secondary text            |
| `--color-line`  | `#E6E5E3` | Hairline borders          |
| `--color-accent`| `#2783DE` | Links and emphasis        |

Brand assets are original vector artwork committed as SVG: the wordmark
(`public/brand/logo-wordmark.svg`), the mark (`public/brand/logo-mark.svg` and an
inverse variant), the favicon (`src/app/icon.svg`), and a geometric mark for each
school rendered from primitives in `src/components/brand/school-mark.tsx`. No
third-party institutional marks are used anywhere in this repository.

Accessibility targets WCAG 2.2 AA: a skip link, visible focus rings, 44 pixel
minimum touch targets, labelled form controls with inline errors announced to
assistive technology, and full support for `prefers-reduced-motion`.

## Testing

```bash
npm test          # Vitest: validation, phone normalisation, triage, rate limiting, CSV
npm run test:e2e  # Playwright: navigation, programme pages, enquiry submission, auth guard
```

The end-to-end suite runs against a real build with a real PostgreSQL instance;
it submits a genuine enquiry and asserts on the returned reference.

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request to `main`:

1. **verify** — format check, lint, typecheck, unit tests, production build
2. **e2e** — schema push and seed against a PostgreSQL service container, build,
   Playwright suite, report uploaded as an artifact

`.github/workflows/codeql.yml` runs CodeQL security and quality analysis on every
push, every pull request and weekly. Dependabot proposes grouped npm and Actions
updates.

## Deployment

The build emits a standalone server, so the container image carries only the
files the runtime needs:

```bash
docker build -t docdev-edu .
docker run --rm -p 3000:3000 --env-file .env.production docdev-edu
```

Apply migrations with `npm run db:deploy` before the new revision receives
traffic, and point your platform's health check at `/api/health`.

## Project structure

```
prisma/            Schema and seed script
public/brand/      Original SVG brand assets
src/app/           App Router routes, API handlers, metadata routes
src/components/    Brand, layout, UI primitives, enquiry form
src/content/       Typed editorial content: programmes, faculty, research, news
src/lib/           Domain rules, database client, auth, rate limiting, formatting
tests/unit/        Vitest suites
tests/e2e/         Playwright suites
```

## Licence

Released under the [MIT Licence](LICENSE). The DarkDev EDU name and marks are
reserved; the code is free to reuse.

# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[semantic versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-07-31

### Added

- Public prospectus: home, about, academics index and twelve programme pages,
  admissions, fees and funding, research, campus, faculty, news, events, contact
  and the legal pages.
- Admissions enquiry pipeline: Zod-validated `POST /api/inquiries` with per-client
  rate limiting, a honeypot field, deterministic triage into high, standard and
  long-term priority, and a human-quotable `DDE-YYYY-XXXXXX` reference.
- Optional mirroring of accepted enquiries to an external endpoint with header
  authentication, a five second timeout and an audit event on every outcome.
- Admissions console at `/admin`: queue with search and status filters, detail
  view with the full audit trail, status, priority and note updates, and a CSV
  export.
- PostgreSQL schema managed by Prisma, with an append-only enquiry event log and
  a seed script.
- Original SVG brand system: wordmark, mark and inverse mark, favicon, and a
  geometric mark for each of the six schools.
- Design token layer in Tailwind CSS v4, accessible component primitives, and a
  WCAG 2.2 AA baseline including a skip link and reduced-motion support.
- Vitest unit suite and Playwright end-to-end suite covering the enquiry journey.
- GitHub Actions pipelines for format, lint, typecheck, unit tests, build and
  end-to-end tests against a PostgreSQL service container, plus CodeQL analysis
  and Dependabot updates.
- Multi-stage Dockerfile producing a standalone runtime image, and a Compose file
  for local PostgreSQL.

# Contributing

Thank you for taking the time to improve this project. The bar is simple: a
change should be easy to review, easy to revert, and covered by a check that
would have caught the bug.

## Getting set up

```bash
npm install
cp .env.example .env.local
docker compose up -d
npm run db:push && npm run db:seed
npm run dev
```

## Before you open a pull request

```bash
npm run format
npm run lint
npm run typecheck
npm test
npm run test:e2e   # when routing, forms or the API changed
```

## House style

- TypeScript in strict mode. No `any`, no unchecked index access, no non-null
  assertions to silence the compiler.
- Server components by default. Add `"use client"` only where interactivity or
  browser APIs genuinely require it.
- Validate every external input with Zod at the boundary, then work with typed
  data inside.
- Prose in the interface uses British spelling and plain language.
- Comments explain **why**, not what. Delete a comment rather than let it drift.

## Commit messages

Conventional Commits, imperative mood, one logical change per commit:

```
feat(admissions): add intake filter to the enquiry queue
fix(api): return 422 for an unknown programme title
docs(readme): document the webhook mirror contract
```

## Content changes

Programmes, faculty, research and news live in `src/content` as typed data.
Updating the prospectus is a code change and goes through review like any other.

## Reporting problems

Use the issue templates. For anything with security impact, follow
[SECURITY.md](SECURITY.md) instead of opening a public issue.

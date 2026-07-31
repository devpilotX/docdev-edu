# Security policy

## Reporting a vulnerability

Please do not open a public issue for a security problem. Report it privately
through GitHub's [private vulnerability reporting](https://github.com/devpilotX/docdev-edu/security/advisories/new),
or email `security@docdev.edu`.

Include the affected endpoint or page, the steps to reproduce, and the impact you
believe it has. A proof of concept is welcome.

**What to expect**

| Stage                | Target                |
| -------------------- | --------------------- |
| Acknowledgement      | 2 working days        |
| Initial assessment   | 5 working days        |
| Fix or mitigation    | 30 days for high severity |

## Supported versions

The `main` branch is the supported version. Security fixes are not backported.

## Controls in this codebase

- All external input is validated with Zod at the boundary.
- The public enquiry endpoint is rate limited per client and protected by a
  honeypot field.
- Raw IP addresses are never stored; only a keyed one-way hash is persisted.
- Admin passwords are stored as scrypt hashes with a per-password salt and
  verified in constant time.
- Session cookies are `HttpOnly`, `SameSite=Lax`, `Secure` in production, and
  carry an HMAC-SHA-256 signature with an expiry.
- Database access goes through Prisma with parameterised queries only.
- Security headers are set in `next.config.ts`.
- CodeQL analysis and Dependabot updates run on a schedule.

## Out of scope

Reports generated solely by automated scanners without a demonstrated impact,
missing headers with no exploit path, and social engineering.

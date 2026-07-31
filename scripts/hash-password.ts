#!/usr/bin/env tsx
/**
 * Generates an ADMIN_PASSWORD_HASH value.
 *
 *   npx tsx scripts/hash-password.ts "correct horse battery staple"
 */
import { hashPassword } from "../src/lib/auth"

const password = process.argv[2]

if (!password || password.length < 12) {
  console.error("Usage: tsx scripts/hash-password.ts <password of 12+ characters>")
  process.exit(1)
}

console.info(hashPassword(password))

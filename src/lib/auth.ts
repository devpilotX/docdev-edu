import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto"

const SCRYPT_KEY_LENGTH = 64

/** Hashes a password with scrypt and a per-password random salt. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16)
  const derived = scryptSync(password, salt, SCRYPT_KEY_LENGTH)
  return `scrypt$${salt.toString("hex")}$${derived.toString("hex")}`
}

/** Constant-time verification of a password against a stored scrypt hash. */
export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, saltHex, digestHex] = stored.split("$")
  if (scheme !== "scrypt" || !saltHex || !digestHex) return false

  const salt = Buffer.from(saltHex, "hex")
  const expected = Buffer.from(digestHex, "hex")
  if (salt.length === 0 || expected.length === 0) return false

  const derived = scryptSync(password, salt, expected.length)
  return timingSafeEqual(derived, expected)
}

export type SessionPayload = {
  sub: string
  exp: number
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url")
}

function signature(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("base64url")
}

/** Creates a tamper-evident session token. */
export function createSessionToken(
  payload: SessionPayload,
  secret: string,
): string {
  const body = base64url(JSON.stringify(payload))
  return `${body}.${signature(body, secret)}`
}

/** Returns the payload when the token is authentic and unexpired. */
export function readSessionToken(
  token: string,
  secret: string,
  now: number = Date.now(),
): SessionPayload | null {
  const [body, provided] = token.split(".")
  if (!body || !provided) return null

  const expected = signature(body, secret)
  const providedBuffer = Buffer.from(provided)
  const expectedBuffer = Buffer.from(expected)
  if (providedBuffer.length !== expectedBuffer.length) return null
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return null

  try {
    const parsed: unknown = JSON.parse(Buffer.from(body, "base64url").toString())
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as SessionPayload).sub !== "string" ||
      typeof (parsed as SessionPayload).exp !== "number"
    ) {
      return null
    }
    const payload = parsed as SessionPayload
    return payload.exp > now ? payload : null
  } catch {
    return null
  }
}

/** One-way, salted hash of an IP address for abuse tracking without storing PII. */
export function hashIpAddress(ip: string, secret: string): string {
  return createHmac("sha256", secret).update(ip).digest("hex").slice(0, 32)
}

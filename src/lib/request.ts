import "server-only"

import { hashIpAddress } from "@/lib/auth"
import { env } from "@/lib/env"

/** Best-effort client address, trusting the first proxy hop only. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  return request.headers.get("x-real-ip")?.trim() ?? "unknown"
}

/**
 * Stable, non-reversible identifier for abuse controls. The raw address is
 * never persisted or logged.
 */
export function clientFingerprint(request: Request): string {
  const secret = env.sessionSecret ?? "darkdev-edu-development-secret"
  return hashIpAddress(clientIp(request), secret)
}

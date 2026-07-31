import { beforeEach, describe, expect, it } from "vitest"

import { checkRateLimit, resetRateLimits } from "@/lib/rate-limit"

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimits()
  })

  it("allows requests up to the limit", () => {
    const now = 1_000_000
    expect(checkRateLimit("key", 3, 60_000, now).allowed).toBe(true)
    expect(checkRateLimit("key", 3, 60_000, now).allowed).toBe(true)
    expect(checkRateLimit("key", 3, 60_000, now).allowed).toBe(true)
  })

  it("blocks the request after the limit is exceeded", () => {
    const now = 1_000_000
    for (let attempt = 0; attempt < 3; attempt += 1) {
      checkRateLimit("key", 3, 60_000, now)
    }
    const blocked = checkRateLimit("key", 3, 60_000, now)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0)
  })

  it("opens a new window once the previous one expires", () => {
    const now = 1_000_000
    checkRateLimit("key", 1, 60_000, now)
    expect(checkRateLimit("key", 1, 60_000, now).allowed).toBe(false)
    expect(checkRateLimit("key", 1, 60_000, now + 60_001).allowed).toBe(true)
  })

  it("tracks keys independently", () => {
    const now = 1_000_000
    checkRateLimit("a", 1, 60_000, now)
    expect(checkRateLimit("b", 1, 60_000, now).allowed).toBe(true)
  })
})

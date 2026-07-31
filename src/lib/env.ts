/**
 * Environment access.
 *
 * Values are read lazily so that a production build never fails because a
 * runtime-only secret is absent on the build machine. Anything genuinely
 * required is validated at the point of use with a clear error message.
 */

function read(name: string): string | undefined {
  const value = process.env[name]
  if (value === undefined) return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function readNumber(name: string, fallback: number): number {
  const raw = read(name)
  if (!raw) return fallback
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export function requireEnv(name: string): string {
  const value = read(name)
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". See .env.example for the expected configuration.`,
    )
  }
  return value
}

export const env = {
  get siteUrl(): string {
    return read("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000"
  },
  get nodeEnv(): string {
    return read("NODE_ENV") ?? "development"
  },
  get isProduction(): boolean {
    return this.nodeEnv === "production"
  },
  get adminEmail(): string | undefined {
    return read("ADMIN_EMAIL")?.toLowerCase()
  },
  get adminPasswordHash(): string | undefined {
    return read("ADMIN_PASSWORD_HASH")
  },
  get sessionSecret(): string | undefined {
    return read("SESSION_SECRET")
  },
  get inquiryWebhookUrl(): string | undefined {
    return read("INQUIRY_WEBHOOK_URL")
  },
  get inquiryWebhookHeaderName(): string {
    return read("INQUIRY_WEBHOOK_HEADER_NAME") ?? "x-api-key"
  },
  get inquiryWebhookHeaderValue(): string | undefined {
    return read("INQUIRY_WEBHOOK_HEADER_VALUE")
  },
  get rateLimitMax(): number {
    return readNumber("INQUIRY_RATE_LIMIT_MAX", 5)
  },
  get rateLimitWindowMs(): number {
    return readNumber("INQUIRY_RATE_LIMIT_WINDOW_MS", 10 * 60 * 1000)
  },
} as const

import "server-only"

import { env } from "@/lib/env"

export type ForwardPayload = {
  enquiry_id: string
  name: string
  email: string
  phone: string
  course: string
  intake: string
  message: string
  source: string
  consent: boolean
  received_at: string
}

export type ForwardResult =
  | { status: "skipped" }
  | { status: "delivered" }
  | { status: "failed"; reason: string }

/**
 * Optionally mirrors an accepted enquiry to an external endpoint (CRM,
 * automation platform, or an internal service). Delivery failures never fail
 * the visitor's submission: the enquiry is already durable in PostgreSQL.
 */
export async function forwardInquiry(
  payload: ForwardPayload,
  timeoutMs = 5000,
): Promise<ForwardResult> {
  const url = env.inquiryWebhookUrl
  if (!url) return { status: "skipped" }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const headers: Record<string, string> = {
      "content-type": "application/json",
    }
    const headerValue = env.inquiryWebhookHeaderValue
    if (headerValue) headers[env.inquiryWebhookHeaderName] = headerValue

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!response.ok) {
      return { status: "failed", reason: `Upstream responded ${response.status}` }
    }
    return { status: "delivered" }
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown transport error"
    return { status: "failed", reason }
  } finally {
    clearTimeout(timer)
  }
}

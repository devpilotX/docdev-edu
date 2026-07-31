import { z } from "zod"

import { intakes, programmes } from "@/content/programmes"

export const INQUIRY_SOURCES = [
  "website-form",
  "prospectus",
  "open-day",
  "referral",
  "api",
] as const

const programmeTitles = programmes.map((programme) => programme.title)
const intakeLabels = intakes.map((intake) => intake.label)

/**
 * Validation contract for the public enquiry endpoint.
 *
 * The field names are deliberately snake-case friendly on input: the same
 * payload can be posted by the website, by a CRM, or by an automation
 * platform without a translation layer.
 */
export const inquiryInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name must be 120 characters or fewer."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(180),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a contact number.")
    .max(24, "Please enter a valid contact number."),
  programme: z
    .string()
    .trim()
    .min(2, "Please choose a programme.")
    .max(160)
    .refine(
      (value) => programmeTitles.includes(value) || value === "Not decided yet",
      "Please choose a programme from the list.",
    ),
  intake: z
    .string()
    .trim()
    .refine((value) => intakeLabels.includes(value), "Please choose an intake."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little about your background.")
    .max(2000, "Message must be 2000 characters or fewer."),
  source: z.enum(INQUIRY_SOURCES).default("website-form"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept the privacy notice to continue." }),
  }),
  /// Honeypot. Real people never fill this in; bots usually do.
  company: z.string().max(0).optional().or(z.literal("")),
})

export type InquiryInput = z.infer<typeof inquiryInputSchema>

export const inquiryStatusValues = [
  "NEW",
  "IN_REVIEW",
  "CONTACTED",
  "APPLICATION_SENT",
  "ENROLLED",
  "CLOSED",
] as const

export const inquiryPriorityValues = ["HOT", "WARM", "NURTURE"] as const

export const inquiryUpdateSchema = z.object({
  status: z.enum(inquiryStatusValues).optional(),
  priority: z.enum(inquiryPriorityValues).optional(),
  note: z.string().trim().max(1000).optional(),
})

export type InquiryUpdate = z.infer<typeof inquiryUpdateSchema>

export const STATUS_LABELS: Record<(typeof inquiryStatusValues)[number], string> = {
  NEW: "New",
  IN_REVIEW: "In review",
  CONTACTED: "Contacted",
  APPLICATION_SENT: "Application sent",
  ENROLLED: "Enrolled",
  CLOSED: "Closed",
}

export const PRIORITY_LABELS: Record<(typeof inquiryPriorityValues)[number], string> =
  {
    HOT: "High",
    WARM: "Standard",
    NURTURE: "Long term",
  }

/**
 * Normalises a supplied number to E.164 for Indian mobile numbers and keeps
 * any other international number in a compact `+` prefixed form.
 */
export function normalisePhone(raw: string): string {
  const trimmed = raw.trim()
  const digits = trimmed.replace(/[^0-9]/g, "")
  if (digits.length === 0) return ""

  const hasInternationalPrefix = trimmed.startsWith("+") && !trimmed.startsWith("+91")
  if (hasInternationalPrefix) return `+${digits}`

  const last10 = digits.slice(-10)
  if (last10.length === 10 && /^[6-9]/.test(last10)) return `+91${last10}`
  return `+${digits}`
}

/** Derives the programme slug and level from a programme title. */
export function resolveProgramme(title: string): {
  slug: string | null
  level: string
} {
  const match = programmes.find((programme) => programme.title === title)
  if (!match) return { slug: null, level: "Undecided" }
  return { slug: match.slug, level: match.level }
}

/**
 * Triage rule used to order the admissions queue. Deliberately explicit and
 * inspectable: an admissions officer can read this and predict the outcome.
 */
export function derivePriority(input: {
  message: string
  programme: string
  intake: string
}): (typeof inquiryPriorityValues)[number] {
  const message = input.message.toLowerCase()
  const isNearestIntake = input.intake === (intakes[0]?.label ?? "")
  const highIntent = [
    "apply",
    "application",
    "admission",
    "deadline",
    "visit",
    "campus tour",
    "fee",
    "fees",
    "scholarship",
    "seat",
    "enrol",
    "enroll",
  ].some((term) => message.includes(term))

  if (isNearestIntake && highIntent) return "HOT"
  if (isNearestIntake || highIntent) return "WARM"
  return "NURTURE"
}

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

/** Builds a short, unambiguous reference such as `DDE-2026-7KQ4M2`. */
export function buildReference(now: Date = new Date()): string {
  let suffix = ""
  const bytes = new Uint8Array(6)
  globalThis.crypto.getRandomValues(bytes)
  for (const byte of bytes) {
    suffix += REFERENCE_ALPHABET[byte % REFERENCE_ALPHABET.length]
  }
  return `DDE-${now.getUTCFullYear()}-${suffix}`
}

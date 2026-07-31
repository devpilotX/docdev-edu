import { describe, expect, it } from "vitest"

import {
  buildReference,
  derivePriority,
  inquiryInputSchema,
  inquiryUpdateSchema,
  normalisePhone,
  resolveProgramme,
} from "@/lib/inquiry"

const validPayload = {
  name: "Ananya Sharma",
  email: "Ananya.Sharma@Example.com",
  phone: "98765 43210",
  programme: "BSc Computer Science",
  intake: "Autumn 2026",
  message: "I would like to know about the application deadline for this programme.",
  consent: true,
}

describe("inquiryInputSchema", () => {
  it("accepts a complete payload and defaults the source", () => {
    const result = inquiryInputSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.source).toBe("website-form")
      expect(result.data.email).toBe("ananya.sharma@example.com")
    }
  })

  it("rejects a programme that is not offered", () => {
    const result = inquiryInputSchema.safeParse({
      ...validPayload,
      programme: "BSc Astrology",
    })
    expect(result.success).toBe(false)
  })

  it("requires explicit consent", () => {
    const result = inquiryInputSchema.safeParse({ ...validPayload, consent: false })
    expect(result.success).toBe(false)
  })

  it("rejects a message that is too short to act on", () => {
    const result = inquiryInputSchema.safeParse({ ...validPayload, message: "hello" })
    expect(result.success).toBe(false)
  })
})

describe("normalisePhone", () => {
  it("converts a ten digit Indian mobile number to E.164", () => {
    expect(normalisePhone("98765 43210")).toBe("+919876543210")
  })

  it("strips a leading zero and the 91 country code", () => {
    expect(normalisePhone("+91 098765 43210")).toBe("+919876543210")
  })

  it("preserves other international numbers", () => {
    expect(normalisePhone("+44 20 7946 0958")).toBe("+442079460958")
  })

  it("returns an empty string when there are no digits", () => {
    expect(normalisePhone("  ")).toBe("")
  })
})

describe("resolveProgramme", () => {
  it("resolves a known programme to its slug and level", () => {
    expect(resolveProgramme("MSc Data Science")).toEqual({
      slug: "msc-data-science",
      level: "Graduate",
    })
  })

  it("falls back to undecided for an unknown title", () => {
    expect(resolveProgramme("Not decided yet")).toEqual({
      slug: null,
      level: "Undecided",
    })
  })
})

describe("derivePriority", () => {
  it("marks the nearest intake with buying signals as high priority", () => {
    expect(
      derivePriority({
        message: "What is the application deadline and the scholarship amount?",
        programme: "BSc Computer Science",
        intake: "Autumn 2026",
      }),
    ).toBe("HOT")
  })

  it("marks a distant intake without signals as long term", () => {
    expect(
      derivePriority({
        message: "Just browsing the programmes for the future.",
        programme: "BSc Computer Science",
        intake: "Autumn 2027",
      }),
    ).toBe("NURTURE")
  })

  it("marks a single signal as standard priority", () => {
    expect(
      derivePriority({
        message: "Please share the fee structure.",
        programme: "BSc Computer Science",
        intake: "Spring 2027",
      }),
    ).toBe("WARM")
  })
})

describe("buildReference", () => {
  it("uses the DDE prefix, the year and a six character suffix", () => {
    const reference = buildReference(new Date("2026-07-31T00:00:00Z"))
    expect(reference).toMatch(/^DDE-2026-[A-HJ-NP-Z2-9]{6}$/)
  })

  it("does not repeat within a large sample", () => {
    const references = new Set(
      Array.from({ length: 500 }, () => buildReference(new Date())),
    )
    expect(references.size).toBeGreaterThan(495)
  })
})

describe("inquiryUpdateSchema", () => {
  it("accepts a status change", () => {
    expect(inquiryUpdateSchema.safeParse({ status: "CONTACTED" }).success).toBe(true)
  })

  it("rejects an unknown status", () => {
    expect(inquiryUpdateSchema.safeParse({ status: "ARCHIVED" }).success).toBe(false)
  })
})

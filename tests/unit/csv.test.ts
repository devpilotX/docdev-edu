import { describe, expect, it } from "vitest"

import { escapeCsvValue, toCsv } from "@/lib/csv"

describe("escapeCsvValue", () => {
  it("leaves simple values untouched", () => {
    expect(escapeCsvValue("Ananya")).toBe("Ananya")
  })

  it("quotes values containing a comma, quote or newline", () => {
    expect(escapeCsvValue('He said "hello", loudly')).toBe(
      '"He said ""hello"", loudly"',
    )
    expect(escapeCsvValue("line one\nline two")).toBe('"line one\nline two"')
  })

  it("renders null and undefined as empty", () => {
    expect(escapeCsvValue(null)).toBe("")
    expect(escapeCsvValue(undefined)).toBe("")
  })
})

describe("toCsv", () => {
  it("writes a header row and CRLF line endings", () => {
    const csv = toCsv(
      [
        { name: "Ananya", programme: "BSc Computer Science" },
        { name: "Rahul", programme: "MSc Data Science" },
      ],
      ["name", "programme"],
    )

    expect(csv).toBe(
      "name,programme\r\nAnanya,BSc Computer Science\r\nRahul,MSc Data Science",
    )
  })

  it("emits empty cells for missing columns", () => {
    expect(toCsv([{ name: "Ananya" }], ["name", "email"])).toBe("name,email\r\nAnanya,")
  })
})

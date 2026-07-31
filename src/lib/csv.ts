/** Minimal, spec-correct CSV serialisation (RFC 4180). */

export function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return ""
  const asString = value instanceof Date ? value.toISOString() : String(value)
  if (/[",\n\r]/.test(asString)) {
    return `"${asString.replace(/"/g, '""')}"`
  }
  return asString
}

export function toCsv(
  rows: ReadonlyArray<Record<string, unknown>>,
  columns: ReadonlyArray<string>,
): string {
  const header = columns.map(escapeCsvValue).join(",")
  const body = rows.map((row) =>
    columns.map((column) => escapeCsvValue(row[column])).join(","),
  )
  return [header, ...body].join("\r\n")
}

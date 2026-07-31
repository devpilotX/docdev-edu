import { NextResponse } from "next/server"

export type ApiError = {
  message: string
  fieldErrors?: Record<string, string>
}

export function jsonError(
  status: number,
  message: string,
  fieldErrors?: Record<string, string>,
  headers?: Record<string, string>,
): NextResponse<ApiError> {
  return NextResponse.json<ApiError>(
    fieldErrors ? { message, fieldErrors } : { message },
    { status, headers },
  )
}

/** Flattens a Zod issue list into one message per field. */
export function toFieldErrors(
  issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>,
): Record<string, string> {
  const result: Record<string, string> = {}
  for (const issue of issues) {
    const key = issue.path.map(String).join(".") || "form"
    if (!result[key]) result[key] = issue.message
  }
  return result
}

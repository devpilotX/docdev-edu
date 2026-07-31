import { z } from "zod"

import { intakes, programmes } from "@/content/programmes"

const programmeOptions = [
  ...programmes.map((programme) => programme.title),
  "Not decided yet",
]

/**
 * Browser-side schema for the enquiry form.
 *
 * It mirrors the server contract in `@/lib/inquiry` but keeps every field a
 * plain required value so that react-hook-form input and output types match.
 * The server always re-validates with the stricter contract.
 */
export const inquiryFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(180),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a contact number.")
    .max(24, "Please enter a valid contact number."),
  programme: z
    .string()
    .refine((value) => programmeOptions.includes(value), "Please choose a programme."),
  intake: z
    .string()
    .refine(
      (value) => intakes.some((intake) => intake.label === value),
      "Please choose an intake.",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little about your background.")
    .max(2000, "Message must be 2000 characters or fewer."),
  consent: z
    .boolean()
    .refine((value) => value, "Please accept the privacy notice to continue."),
  company: z.string(),
})

export type InquiryFormValues = z.infer<typeof inquiryFormSchema>

export const programmeSelectOptions = programmeOptions

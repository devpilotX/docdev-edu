"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, SelectInput, TextArea, TextInput } from "@/components/ui/field"
import { intakes } from "@/content/programmes"
import {
  inquiryFormSchema,
  programmeSelectOptions,
  type InquiryFormValues,
} from "@/lib/inquiry-form"

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string }

const defaultValues: InquiryFormValues = {
  name: "",
  email: "",
  phone: "",
  programme: "",
  intake: "",
  message: "",
  consent: false,
  company: "",
}

export function InquiryForm({
  defaultProgramme,
  source = "website-form",
}: {
  defaultProgramme?: string
  source?: string
}) {
  const [state, setState] = useState<SubmissionState>({ status: "idle" })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      ...defaultValues,
      programme: defaultProgramme ?? "",
    },
  })

  async function onSubmit(values: InquiryFormValues) {
    setState({ status: "submitting" })
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      })

      const payload: unknown = await response.json()

      if (!response.ok) {
        const message =
          typeof payload === "object" &&
          payload !== null &&
          "message" in payload &&
          typeof (payload as { message: unknown }).message === "string"
            ? (payload as { message: string }).message
            : "We could not submit your enquiry. Please try again."
        setState({ status: "error", message })
        return
      }

      const reference =
        typeof payload === "object" &&
        payload !== null &&
        "reference" in payload &&
        typeof (payload as { reference: unknown }).reference === "string"
          ? (payload as { reference: string }).reference
          : ""

      reset(defaultValues)
      setState({ status: "success", reference })
    } catch {
      setState({
        status: "error",
        message:
          "We could not reach the admissions service. Please check your connection and try again.",
      })
    }
  }

  if (state.status === "success") {
    return (
      <div
        className="rounded-[var(--radius-card)] border border-line bg-white p-6"
        role="status"
        aria-live="polite"
      >
        <h3 className="text-xl">Enquiry received</h3>
        <p className="mt-2 text-sm text-muted">
          Your reference is{" "}
          <span className="font-mono font-semibold text-ink">{state.reference}</span>.
          The admissions office replies in writing within one working day, Monday to
          Saturday.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setState({ status: "idle" })}>
            Send another enquiry
          </Button>
          <Link
            href="/admissions"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:underline"
          >
            Read the admissions process
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[var(--radius-card)] border border-line bg-white p-6"
    >
      <h3 className="text-xl">Admissions enquiry</h3>
      <p className="mt-2 mb-6 text-sm text-muted">
        Answered by the admissions office, Monday to Saturday, 09:00–21:00 IST.
      </p>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={errors.name?.message}>
          <TextInput
            id="name"
            autoComplete="name"
            placeholder="Ananya Sharma"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </Field>
        <Field
          label="Phone"
          htmlFor="phone"
          required
          hint="Include the country code for numbers outside India."
          error={errors.phone?.message}
        >
          <TextInput
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="email" required error={errors.email?.message}>
        <TextInput
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field
          label="Programme"
          htmlFor="programme"
          required
          error={errors.programme?.message}
        >
          <SelectInput
            id="programme"
            aria-invalid={Boolean(errors.programme)}
            defaultValue=""
            {...register("programme")}
          >
            <option value="" disabled>
              Choose a programme
            </option>
            {programmeSelectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Intake" htmlFor="intake" required error={errors.intake?.message}>
          <SelectInput
            id="intake"
            aria-invalid={Boolean(errors.intake)}
            defaultValue=""
            {...register("intake")}
          >
            <option value="" disabled>
              Choose an intake
            </option>
            {intakes.map((intake) => (
              <option key={intake.label} value={intake.label}>
                {intake.label}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>

      <Field label="Message" htmlFor="message" required error={errors.message?.message}>
        <TextArea
          id="message"
          rows={4}
          placeholder="Tell us about your background and what you would like to study."
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
      </Field>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="mb-5">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            className="mt-1 h-[18px] w-[18px] rounded border-line"
            aria-invalid={Boolean(errors.consent)}
            {...register("consent")}
          />
          <label htmlFor="consent" className="text-[13px] text-muted">
            I agree to be contacted about this enquiry and accept the{" "}
            <Link href="/privacy" className="text-accent hover:underline">
              privacy notice
            </Link>
            .
          </label>
        </div>
        {errors.consent ? (
          <p className="mt-1.5 text-[13px] font-medium text-critical" role="alert">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      {state.status === "error" ? (
        <p
          className="mb-4 rounded-lg bg-critical-soft px-4 py-3 text-sm text-critical"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  )
}

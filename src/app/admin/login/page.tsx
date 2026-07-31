import type { Metadata } from "next"

import { signIn } from "@/app/admin/actions"
import { LogoMark } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { Field, TextInput } from "@/components/ui/field"

export const metadata: Metadata = {
  title: "Admissions console",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const { error, next } = await searchParams

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-surface px-6 py-16">
      <div className="w-full max-w-[420px] rounded-[var(--radius-card)] border border-line bg-white p-8">
        <LogoMark size={40} />
        <h1 className="mt-5 text-2xl">Admissions console</h1>
        <p className="mt-2 mb-6 text-sm text-muted">
          Sign in with the admissions account configured for this deployment.
        </p>

        {error ? (
          <p
            className="mb-4 rounded-lg bg-critical-soft px-4 py-3 text-sm text-critical"
            role="alert"
          >
            Those credentials were not recognised.
          </p>
        ) : null}

        <form action={signIn}>
          <input type="hidden" name="next" value={next ?? "/admin"} />
          <Field label="Email" htmlFor="email" required>
            <TextInput
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
            />
          </Field>
          <Field label="Password" htmlFor="password" required>
            <TextInput
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </Field>
          <Button type="submit" className="mt-2 w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}

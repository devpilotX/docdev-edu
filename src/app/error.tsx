"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-surface py-24">
      <Container width="narrow">
        <p className="text-xs font-semibold tracking-[0.18em] text-critical uppercase">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl">This page could not be displayed</h1>
        <p className="mt-3 text-muted">
          The error has been logged. You can retry, or contact the admissions office
          directly if the problem persists.
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-[13px] text-muted">
            Reference: {error.digest}
          </p>
        ) : null}
        <Button className="mt-8" onClick={reset}>
          Try again
        </Button>
      </Container>
    </div>
  )
}

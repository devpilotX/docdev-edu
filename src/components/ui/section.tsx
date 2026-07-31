import type { ReactNode } from "react"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

export function Section({
  children,
  className,
  tone = "canvas",
  width = "default",
  id,
}: {
  children: ReactNode
  className?: string
  tone?: "canvas" | "surface" | "ink"
  width?: "default" | "narrow" | "wide"
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20",
        tone === "surface" && "bg-surface",
        tone === "ink" && "bg-ink text-white/75",
        className,
      )}
    >
      <Container width={width}>{children}</Container>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  inverse = false,
  className,
}: {
  eyebrow?: string
  title: string
  lede?: string
  inverse?: boolean
  className?: string
}) {
  return (
    <div className={cn("mb-10 max-w-[62ch]", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 text-xs font-semibold tracking-[0.18em] uppercase",
            inverse ? "text-accent-light" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-[clamp(1.75rem,3vw,2.15rem)] leading-tight",
          inverse && "text-white",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p className={cn("mt-3", inverse ? "text-white/70" : "text-muted")}>{lede}</p>
      ) : null}
    </div>
  )
}

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "article" | "li" | "section"
}) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-card)] border border-line bg-white p-6",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode
  tone?: "accent" | "neutral" | "positive" | "attention" | "critical"
  className?: string
}) {
  const tones: Record<string, string> = {
    accent: "bg-accent-soft text-accent-strong",
    neutral: "bg-surface-2 text-ink-soft",
    positive: "bg-positive-soft text-positive",
    attention: "bg-attention-soft text-attention",
    critical: "bg-critical-soft text-critical",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

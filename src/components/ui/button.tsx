import Link from "next/link"
import type { ButtonHTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

export type ButtonVariant = "primary" | "secondary" | "inverse" | "quiet"
export type ButtonSize = "md" | "lg"

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60"

const variants: Record<ButtonVariant, string> = {
  primary: "border-ink bg-ink text-white hover:bg-ink-soft",
  secondary: "border-line bg-white text-ink hover:bg-surface-2",
  inverse: "border-white/25 bg-transparent text-white hover:bg-white/10",
  quiet: "border-transparent bg-transparent text-ink hover:bg-surface-2",
}

const sizes: Record<ButtonSize, string> = {
  md: "px-5",
  lg: "min-h-12 px-6 text-[15px]",
}

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className)
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  )
}

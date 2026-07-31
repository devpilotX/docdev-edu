import Link from "next/link"

import { cn } from "@/lib/utils"

type LogoProps = {
  /** Renders the light-on-dark treatment for use on the ink background. */
  inverse?: boolean
  /** Hides the institute descriptor line on tight layouts. */
  compact?: boolean
  className?: string
}

export function LogoMark({
  inverse = false,
  size = 36,
}: {
  inverse?: boolean
  size?: number
}) {
  const plate = inverse ? "#FFFFFF" : "#0E1116"
  const stroke = inverse ? "#0E1116" : "#FFFFFF"
  const accent = inverse ? "#2783DE" : "#5E9FE8"

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="14" fill={plate} />
      <rect x="30.75" y="15" width="2.5" height="34" rx="1.25" fill={stroke} />
      <path
        d="M25 20 14 32l11 12"
        fill="none"
        stroke={stroke}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39 20l11 12-11 12"
        fill="none"
        stroke={accent}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ inverse = false, compact = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="DarkDev EDU, home"
    >
      <LogoMark inverse={inverse} size={compact ? 32 : 36} />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-serif text-[17px] tracking-wide",
            inverse ? "text-white" : "text-ink",
          )}
        >
          <strong className="font-bold">DarkDev</strong> EDU
        </span>
        {!compact ? (
          <span
            className={cn(
              "block text-[10px] font-medium tracking-[0.18em] uppercase",
              inverse ? "text-white/60" : "text-muted",
            )}
          >
            Institute of Technology
          </span>
        ) : null}
      </span>
    </Link>
  )
}

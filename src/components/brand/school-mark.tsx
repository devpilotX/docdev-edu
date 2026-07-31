/**
 * Original geometric marks for each school. Built from primitives so that they
 * stay crisp at any size and never depend on a raster asset.
 */
type SchoolMarkProps = {
  slug: string
  size?: number
  className?: string
}

const ACCENT = "#2783DE"
const INK = "#0E1116"

function Shape({ slug }: { slug: string }) {
  switch (slug) {
    case "computing":
      return (
        <>
          <rect x="10" y="10" width="28" height="28" rx="6" fill="none" stroke={INK} strokeWidth={2} />
          <path d="M18 18v12M30 18v12" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
          <path d="M18 24h12" stroke={INK} strokeWidth={2} strokeLinecap="round" />
        </>
      )
    case "engineering":
      return (
        <>
          <circle cx="24" cy="24" r="13" fill="none" stroke={INK} strokeWidth={2} />
          <circle cx="24" cy="24" r="4.5" fill="none" stroke={ACCENT} strokeWidth={2} />
          <path d="M24 11v5M24 32v5M11 24h5M32 24h5" stroke={INK} strokeWidth={2} strokeLinecap="round" />
        </>
      )
    case "data-science":
      return (
        <>
          <path d="M12 36V22M20 36V14M28 36v-9M36 36V18" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
          <circle cx="28" cy="27" r="3" fill={ACCENT} />
        </>
      )
    case "design":
      return (
        <>
          <path d="M14 34 24 12l10 22" fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <path d="M18 27h12" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
        </>
      )
    case "sciences":
      return (
        <>
          <path d="M20 11v9L12 34a3 3 0 0 0 2.7 4h18.6a3 3 0 0 0 2.7-4l-8-14v-9" fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <path d="M17 11h14" stroke={INK} strokeWidth={2} strokeLinecap="round" />
          <circle cx="24" cy="31" r="2.5" fill={ACCENT} />
        </>
      )
    default:
      return (
        <>
          <path d="M12 30 24 12l12 18" fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <path d="M14 36h20" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
        </>
      )
  }
}

export function SchoolMark({ slug, size = 48, className }: SchoolMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <Shape slug={slug} />
    </svg>
  )
}

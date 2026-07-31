import Link from "next/link"

import { Badge, Card } from "@/components/ui/card"
import type { Programme } from "@/content/programmes"

export function ProgrammeCard({ programme }: { programme: Programme }) {
  const years = (programme.durationMonths / 12).toFixed(
    programme.durationMonths % 12 === 0 ? 0 : 1,
  )

  return (
    <Card as="article" className="flex h-full flex-col transition-colors hover:border-ink/25">
      <div className="flex items-center gap-2">
        <Badge>{programme.level}</Badge>
        <span className="text-[12px] text-muted">{programme.award}</span>
      </div>
      <h3 className="mt-4 text-xl">
        <Link
          href={`/academics/${programme.slug}`}
          className="after:absolute after:inset-0 hover:underline"
        >
          {programme.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted">{programme.summary}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-[13px]">
        <div>
          <dt className="text-muted">Duration</dt>
          <dd className="font-medium text-ink">{years} years</dd>
        </div>
        <div>
          <dt className="text-muted">Mode</dt>
          <dd className="font-medium text-ink">{programme.mode}</dd>
        </div>
      </dl>
    </Card>
  )
}

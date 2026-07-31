export function StatBand({
  stats,
}: {
  stats: ReadonlyArray<{ value: string; label: string }>
}) {
  return (
    <div className="border-y border-line bg-line">
      <dl className="mx-auto grid max-w-[1320px] grid-cols-2 gap-px lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white px-6 py-8">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-serif text-[clamp(1.75rem,3vw,2.1rem)] text-ink">
                {stat.value}
              </span>
              <span className="mt-1 block text-[13px] text-muted">{stat.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

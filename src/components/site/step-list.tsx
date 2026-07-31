export function StepList({
  steps,
}: {
  steps: ReadonlyArray<{ step: string; title: string; detail: string }>
}) {
  return (
    <ol className="mt-2">
      {steps.map((item) => (
        <li key={item.step} className="flex gap-5 border-t border-line py-5">
          <span className="font-serif text-lg text-accent" aria-hidden="true">
            {item.step}
          </span>
          <div>
            <h3 className="font-sans text-[15px] font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

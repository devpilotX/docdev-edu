import { Container } from "@/components/ui/container"

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: string
  lede?: string
}) {
  return (
    <div className="border-b border-line bg-ink py-14 sm:py-20">
      <Container>
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-accent-light uppercase">
          {eyebrow}
        </p>
        <h1 className="max-w-[20ch] text-[clamp(2rem,4.4vw,3rem)] leading-[1.1] text-white">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 max-w-[62ch] text-[17px] text-white/70">{lede}</p>
        ) : null}
      </Container>
    </div>
  )
}

import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function NotFound() {
  return (
    <div className="bg-surface py-24">
      <Container width="narrow">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          404
        </p>
        <h1 className="mt-4 text-3xl">That page does not exist</h1>
        <p className="mt-3 text-muted">
          The address may have changed, or the page may have been retired. The
          programme index and the admissions pages are the best places to start.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/academics" variant="secondary">
            Browse programmes
          </ButtonLink>
        </div>
      </Container>
    </div>
  )
}

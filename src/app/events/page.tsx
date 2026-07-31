import type { Metadata } from "next"

import { PageHeader } from "@/components/site/page-header"
import { ButtonLink } from "@/components/ui/button"
import { Badge } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { upcomingEvents } from "@/content/events"
import { formatDateTime } from "@/lib/format"

export const metadata: Metadata = {
  title: "Events",
  description: "Open days, public lectures, workshops and admissions deadlines at DarkDev EDU.",
}

export const dynamic = "force-dynamic"

export default function EventsPage() {
  const events = upcomingEvents()

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Open days, lectures and deadlines"
        lede="Public lectures are free and unticketed. Open days and workshops require a place to be booked."
      />

      <Section>
        {events.length === 0 ? (
          <p className="text-muted">
            No events are currently scheduled. The next open day is announced each term.
          </p>
        ) : (
          <ol>
            {events.map((event) => (
              <li
                key={event.slug}
                className="grid gap-4 border-t border-line py-6 sm:grid-cols-[220px_1fr] sm:items-start"
              >
                <div>
                  <p className="font-medium text-ink">{formatDateTime(event.startsAt)}</p>
                  <p className="mt-1 text-[13px] text-muted">{event.location}</p>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl">{event.title}</h2>
                    <Badge tone={event.type === "Deadline" ? "attention" : "accent"}>
                      {event.type}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted">{event.summary}</p>
                  {event.bookingRequired ? (
                    <ButtonLink
                      href="/admissions/enquiry"
                      variant="secondary"
                      className="mt-4"
                    >
                      Book a place
                    </ButtonLink>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        )}
      </Section>
    </>
  )
}

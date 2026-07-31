export type CampusEvent = {
  slug: string
  title: string
  type: "Open day" | "Lecture" | "Workshop" | "Deadline"
  startsAt: string
  location: string
  summary: string
  bookingRequired: boolean
}

export const events: ReadonlyArray<CampusEvent> = [
  {
    slug: "open-day-august-2026",
    title: "Campus open day",
    type: "Open day",
    startsAt: "2026-08-16T10:00:00+05:30",
    location: "Main quadrangle, Bailey Road campus",
    summary:
      "Tour the laboratories and studios, sit in on a sample lecture, and speak to admissions staff and current students.",
    bookingRequired: true,
  },
  {
    slug: "application-deadline-autumn-2026",
    title: "Autumn 2026 application deadline",
    type: "Deadline",
    startsAt: "2026-09-05T23:59:00+05:30",
    location: "Online",
    summary: "Final deadline for all undergraduate, graduate and professional applications.",
    bookingRequired: false,
  },
  {
    slug: "public-lecture-consensus",
    title: "Public lecture: what consensus protocols actually guarantee",
    type: "Lecture",
    startsAt: "2026-08-28T18:00:00+05:30",
    location: "Lecture theatre 2, Computing building",
    summary:
      "Professor A. R. Natarajan on the gap between the guarantees in the paper and the behaviour of the deployed system.",
    bookingRequired: false,
  },
  {
    slug: "portfolio-workshop",
    title: "Design portfolio workshop for applicants",
    type: "Workshop",
    startsAt: "2026-08-09T11:00:00+05:30",
    location: "Studio building, ground floor",
    summary:
      "A three-hour session on selecting, sequencing and presenting work for a design application.",
    bookingRequired: true,
  },
  {
    slug: "measurement-clinic",
    title: "Measurement clinic for civic programmes",
    type: "Workshop",
    startsAt: "2026-09-19T14:00:00+05:30",
    location: "Data Science building, room 108",
    summary:
      "Free advisory session for public bodies and non-profits designing an evaluation or a survey.",
    bookingRequired: true,
  },
  {
    slug: "open-day-november-2026",
    title: "Winter open day",
    type: "Open day",
    startsAt: "2026-11-21T10:00:00+05:30",
    location: "Main quadrangle, Bailey Road campus",
    summary: "The second open day of the cycle, aimed at Spring 2027 applicants.",
    bookingRequired: true,
  },
]

export function upcomingEvents(
  from: Date = new Date(),
  limit?: number,
): ReadonlyArray<CampusEvent> {
  const sorted = [...events]
    .filter((event) => new Date(event.startsAt).getTime() >= from.getTime())
    .sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    )
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted
}

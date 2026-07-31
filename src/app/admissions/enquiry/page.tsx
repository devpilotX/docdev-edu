import type { Metadata } from "next"

import { InquiryForm } from "@/components/inquiry/inquiry-form"
import { PageHeader } from "@/components/site/page-header"
import { Section } from "@/components/ui/section"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: "Admissions enquiry",
  description:
    "Ask the DarkDev EDU admissions office about a programme, entry requirements, fees or funding. Answered within one working day.",
}

const answers = [
  {
    question: "How quickly will I hear back?",
    answer:
      "In writing within one working day. Enquiries received after 21:00 IST are answered the next working morning.",
  },
  {
    question: "Can I enquire about more than one programme?",
    answer:
      "Yes. Choose the closest programme and say so in your message; the admissions team will cover both in the reply.",
  },
  {
    question: "What happens to my details?",
    answer:
      "They are stored on institute infrastructure, used only to answer your enquiry, and deleted after 24 months unless you apply.",
  },
]

export default function EnquiryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Make an enquiry"
        lede="One short form. A named admissions officer replies with the specifics for your programme and intake."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-2xl">Before you write</h2>
            <dl className="mt-6">
              {answers.map((item) => (
                <div key={item.question} className="border-t border-line py-4">
                  <dt className="font-semibold text-ink">{item.question}</dt>
                  <dd className="mt-1 text-sm text-muted">{item.answer}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-[var(--radius-card)] bg-surface p-6 text-sm">
              <h3 className="font-sans text-[13px] font-semibold tracking-[0.14em] text-ink uppercase">
                Prefer to call?
              </h3>
              <p className="mt-3">
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="text-accent hover:underline">
                  {site.contact.phone}
                </a>
                <br />
                <a href={`mailto:${site.contact.admissionsEmail}`} className="text-accent hover:underline">
                  {site.contact.admissionsEmail}
                </a>
              </p>
              <p className="mt-3 text-muted">{site.contact.officeHours}</p>
            </div>
          </div>

          <InquiryForm />
        </div>
      </Section>
    </>
  )
}

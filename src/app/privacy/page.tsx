import type { Metadata } from "next"

import { PageHeader } from "@/components/site/page-header"
import { Section } from "@/components/ui/section"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How DarkDev EDU collects, uses, stores and deletes personal data.",
}

const sections = [
  {
    heading: "What we collect",
    body: "When you submit an enquiry we collect your name, email address, telephone number, the programme and intake you selected, and your message. We also store a one-way hash of your IP address and your browser user agent to detect automated abuse. The raw IP address is never written to disk.",
  },
  {
    heading: "Why we collect it",
    body: "To answer your enquiry, to send you information about the programme you asked about, and to report anonymised admissions volumes to the academic senate. We do not sell personal data and we do not use it for advertising.",
  },
  {
    heading: "How long we keep it",
    body: "Enquiry records are deleted 24 months after the last contact, unless you go on to apply, in which case the record is retained under the student records policy.",
  },
  {
    heading: "Who can see it",
    body: "Admissions staff with an authenticated account. Where a deployment forwards enquiries to an institutional CRM, that transfer is encrypted in transit and authenticated with a shared secret.",
  },
  {
    heading: "Your rights",
    body: "You may request a copy of your data, ask for it to be corrected, or ask for it to be deleted. Requests are answered within thirty days.",
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy notice"
        lede="Plain language, no exceptions buried in a schedule."
      />
      <Section width="narrow">
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl">{section.heading}</h2>
              <p className="mt-2 text-[17px]">{section.body}</p>
            </section>
          ))}
          <section>
            <h2 className="text-xl">Contact</h2>
            <p className="mt-2 text-[17px]">
              Write to{" "}
              <a href={`mailto:${site.contact.generalEmail}`} className="text-accent hover:underline">
                {site.contact.generalEmail}
              </a>{" "}
              with any data protection question.
            </p>
          </section>
        </div>
      </Section>
    </>
  )
}

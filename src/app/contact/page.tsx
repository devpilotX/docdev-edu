import type { Metadata } from "next"

import { InquiryForm } from "@/components/inquiry/inquiry-form"
import { PageHeader } from "@/components/site/page-header"
import { Section } from "@/components/ui/section"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact details, campus address and office hours for DarkDev EDU in Patna, Bihar.",
}

const departments = [
  { name: "Admissions", email: site.contact.admissionsEmail, note: "Applications, entry requirements, fees and funding." },
  { name: "General enquiries", email: site.contact.generalEmail, note: "Everything else, including media and partnerships." },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Find and reach the campus"
        lede={site.contact.officeHours}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-2xl">Campus</h2>
            <address className="mt-3 text-[17px] not-italic">
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.country}
            </address>

            <h2 className="mt-10 text-2xl">Departments</h2>
            <dl className="mt-3">
              {departments.map((department) => (
                <div key={department.name} className="border-t border-line py-4">
                  <dt className="font-semibold text-ink">{department.name}</dt>
                  <dd className="mt-1 text-sm text-muted">
                    {department.note}
                    <br />
                    <a href={`mailto:${department.email}`} className="text-accent hover:underline">
                      {department.email}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="border-t border-line py-4">
                <dt className="font-semibold text-ink">Telephone</dt>
                <dd className="mt-1 text-sm">
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="text-accent hover:underline"
                  >
                    {site.contact.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <InquiryForm source="website-form" />
        </div>
      </Section>
    </>
  )
}

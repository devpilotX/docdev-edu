import type { Metadata } from "next"

import { PageHeader } from "@/components/site/page-header"
import { Section } from "@/components/ui/section"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "The accessibility standard this website is built to, known limitations, and how to report a barrier.",
}

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Accessibility statement"
        lede="This website is built to meet WCAG 2.2 level AA."
      />
      <Section width="narrow">
        <div className="space-y-6 text-[17px]">
          <p>
            Every page is navigable by keyboard alone, every interactive control has a
            visible focus indicator with a minimum target size of 44 by 44 pixels, and
            text meets a contrast ratio of at least 4.5 to 1 against its background.
          </p>
          <p>
            Forms use native controls with programmatically associated labels, inline
            error messages announced to assistive technology, and no reliance on colour
            alone to convey meaning. Motion respects the operating system reduced motion
            preference.
          </p>
          <p>
            Known limitation: complex data tables in the admissions console scroll
            horizontally on narrow viewports. A card-based alternative is planned.
          </p>
          <p>
            If you encounter a barrier, write to{" "}
            <a href={`mailto:${site.contact.generalEmail}`} className="text-accent hover:underline">
              {site.contact.generalEmail}
            </a>
            . We aim to respond within five working days.
          </p>
        </div>
      </Section>
    </>
  )
}

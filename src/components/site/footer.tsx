import Link from "next/link"

import { LogoMark } from "@/components/brand/logo"
import { Container } from "@/components/ui/container"
import { footerNav, site } from "@/content/site"

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white/65">
      <Container>
        <div className="grid gap-10 border-b border-line-inverse py-14 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark inverse size={32} />
              <span className="font-serif text-[17px] text-white">
                <strong className="font-bold">DarkDev</strong> EDU
              </span>
            </div>
            <p className="mt-4 max-w-[34ch] text-sm">{site.description}</p>
            <address className="mt-4 text-sm not-italic">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.country}
            </address>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
                {group.title}
              </h2>
              <ul className="space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 py-6 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}
          </p>
          <p>
            <a href={`mailto:${site.contact.admissionsEmail}`} className="hover:text-white">
              {site.contact.admissionsEmail}
            </a>
            <span aria-hidden="true"> · </span>
            <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
              {site.contact.phone}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}

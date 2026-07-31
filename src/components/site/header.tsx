"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Logo } from "@/components/brand/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { primaryNav } from "@/content/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/92 backdrop-blur">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors",
                        active
                          ? "font-semibold text-ink"
                          : "text-ink-soft hover:bg-surface-2",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="/admissions/enquiry" className="hidden sm:inline-flex">
              Enquire
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line lg:hidden"
            >
              <span className="sr-only">
                {open ? "Close navigation" : "Open navigation"}
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                {open ? (
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M3 6h14M3 10h14M3 14h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="mobile-navigation" className="border-t border-line bg-white lg:hidden">
          <Container>
            <ul className="py-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-12 flex-col justify-center border-b border-line py-2 last:border-0"
                  >
                    <span className="text-[15px] font-semibold text-ink">
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="text-[13px] text-muted">{item.description}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pb-4">
              <ButtonLink href="/admissions/enquiry" className="w-full">
                Enquire
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  )
}

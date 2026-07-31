import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode
  className?: string
  width?: "default" | "narrow" | "wide"
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8",
        width === "narrow" && "max-w-[760px]",
        width === "default" && "max-w-[1120px]",
        width === "wide" && "max-w-[1320px]",
        className,
      )}
    >
      {children}
    </div>
  )
}

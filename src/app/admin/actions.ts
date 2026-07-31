"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/db"
import { inquiryUpdateSchema, STATUS_LABELS } from "@/lib/inquiry"
import {
  authenticateAdmin,
  endAdminSession,
  getAdminSession,
  startAdminSession,
} from "@/lib/session"

export async function signIn(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")
  const next = String(formData.get("next") ?? "/admin")

  if (!authenticateAdmin(email, password)) {
    redirect(`/admin/login?error=invalid&next=${encodeURIComponent(next)}`)
  }

  await startAdminSession(email.trim().toLowerCase())
  redirect(next.startsWith("/admin") ? next : "/admin")
}

export async function signOut(): Promise<void> {
  await endAdminSession()
  redirect("/admin/login")
}

export async function updateInquiry(formData: FormData): Promise<void> {
  const session = await getAdminSession()
  if (!session) redirect("/admin/login")

  const id = String(formData.get("id") ?? "")
  if (!id) redirect("/admin")

  const parsed = inquiryUpdateSchema.safeParse({
    status: emptyToUndefined(formData.get("status")),
    priority: emptyToUndefined(formData.get("priority")),
    note: emptyToUndefined(formData.get("note")),
  })

  if (!parsed.success) redirect(`/admin/inquiries/${id}?error=invalid`)

  const { status, priority, note } = parsed.data
  const existing = await prisma.inquiry.findUnique({ where: { id } })
  if (!existing) redirect("/admin")

  const events: Array<{ type: "STATUS_CHANGED" | "NOTE_ADDED"; message: string; actor: string }> =
    []

  if (status && status !== existing.status) {
    events.push({
      type: "STATUS_CHANGED",
      message: `Status changed from ${STATUS_LABELS[existing.status]} to ${STATUS_LABELS[status]}.`,
      actor: session.email,
    })
  }
  if (priority && priority !== existing.priority) {
    events.push({
      type: "STATUS_CHANGED",
      message: `Priority changed from ${existing.priority} to ${priority}.`,
      actor: session.email,
    })
  }
  if (note) {
    events.push({ type: "NOTE_ADDED", message: note, actor: session.email })
  }

  if (events.length === 0) redirect(`/admin/inquiries/${id}`)

  await prisma.inquiry.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(priority ? { priority } : {}),
      events: { create: events },
    },
  })

  revalidatePath("/admin")
  revalidatePath(`/admin/inquiries/${id}`)
  redirect(`/admin/inquiries/${id}`)
}

function emptyToUndefined(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

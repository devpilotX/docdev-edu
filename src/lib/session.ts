import "server-only"

import { cookies } from "next/headers"

import { createSessionToken, readSessionToken, verifyPassword } from "@/lib/auth"
import { env, requireEnv } from "@/lib/env"

export const SESSION_COOKIE = "dde_admin_session"
const SESSION_TTL_MS = 8 * 60 * 60 * 1000

export type AdminSession = {
  email: string
  expiresAt: number
}

/** Verifies submitted credentials against the configured admin account. */
export function authenticateAdmin(email: string, password: string): boolean {
  const configuredEmail = env.adminEmail
  const configuredHash = env.adminPasswordHash
  if (!configuredEmail || !configuredHash) return false
  if (email.trim().toLowerCase() !== configuredEmail) return false
  return verifyPassword(password, configuredHash)
}

/** Issues the signed session cookie after a successful sign-in. */
export async function startAdminSession(email: string): Promise<void> {
  const secret = requireEnv("SESSION_SECRET")
  const expiresAt = Date.now() + SESSION_TTL_MS
  const token = createSessionToken({ sub: email, exp: expiresAt }, secret)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProduction,
    path: "/",
    expires: new Date(expiresAt),
  })
}

export async function endAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

/** Returns the current admin session, or null when signed out. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const secret = env.sessionSecret
  if (!secret) return null

  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  const payload = readSessionToken(token, secret)
  if (!payload) return null

  return { email: payload.sub, expiresAt: payload.exp }
}

export async function isAdminRequest(): Promise<boolean> {
  return (await getAdminSession()) !== null
}

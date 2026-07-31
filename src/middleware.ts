import { NextResponse, type NextRequest } from "next/server"

/**
 * Edge guard for the admissions console.
 *
 * The middleware only checks that a session cookie is present; the signature
 * is verified in the Node.js runtime by `getAdminSession`. That keeps the
 * signing secret and the crypto implementation off the edge.
 */
const SESSION_COOKIE = "dde_admin_session"

export function middleware(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl
  const hasSession = request.cookies.has(SESSION_COOKIE)
  const isLogin = pathname === "/admin/login"

  if (!hasSession && !isLogin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    url.search = `?next=${encodeURIComponent(`${pathname}${search}`)}`
    return NextResponse.redirect(url)
  }

  if (hasSession && isLogin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    url.search = ""
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}

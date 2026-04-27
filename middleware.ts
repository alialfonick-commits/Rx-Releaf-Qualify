import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // ✅ Handle login route FIRST
  if (pathname === "/login") {
    if (token) {
      if (token.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
      }
      if (token.role === "STAFF") {
        return NextResponse.redirect(new URL("/staff/dashboard", req.url))
      }
    }
    return NextResponse.next()
  }

  // ✅ Handle root route "/"
  if (pathname === "/") {
    if (token?.role === "STAFF") {
      return NextResponse.redirect(new URL("/staff/create-exam", req.url))
    }
    return NextResponse.next()
  }

  // ❌ Now protect routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Admin only
  if (pathname.startsWith("/admin")) {
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }

  // Staff only
  if (pathname.startsWith("/staff")) {
    if (token.role !== "STAFF") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/admin/:path*", "/staff/:path*", "/login"]
}
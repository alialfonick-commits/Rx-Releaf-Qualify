import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

export async function requireAuth(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return { error: "Unauthorized", status: 401 }
  }

  return { user: token }
}

export async function requireRole(req: NextRequest, role: string) {
  const token = await getToken({ req })

  if (!token) {
    return { error: "Unauthorized", status: 401 }
  }

  if (token.role !== role) {
    return { error: "Forbidden", status: 403 }
  }

  return { user: token }
}
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"
import { createMfaChallenge } from "@/lib/mfa"
import { sendMfaCodeEmail } from "@/lib/sendEmail"
import { writeAuditLog } from "@/lib/audit"
import { isRateLimitedKey, rateLimit } from "@/lib/rateLimit"
import { isValidEmail } from "@/lib/validation"

export async function POST(req: Request) {
  const limited = rateLimit(req, {
    key: "mfa-start",
    limit: 10,
    windowMs: 15 * 60 * 1000,
  })

  if (limited) {
    return limited
  }

  const body = await req.json()
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
  const password = typeof body.password === "string" ? body.password : ""

  if (!isValidEmail(email) || !password) {
    return NextResponse.json({ ok: true })
  }

  if (
    isRateLimitedKey({
      key: `mfa-start:${email}`,
      limit: 5,
      windowMs: 15 * 60 * 1000,
    })
  ) {
    return NextResponse.json({ ok: true })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !user.isActive || user.isDeleted) {
    return NextResponse.json({ ok: true })
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return NextResponse.json({ ok: true })
  }

  const { code } = await createMfaChallenge(user.id)
  await sendMfaCodeEmail(user.email, code)

  await writeAuditLog({
    userId: user.id,
    action: "MFA_CODE_SENT",
    entity: "User",
    entityId: user.id,
    req,
  })

  return NextResponse.json({ ok: true })
}

import crypto from "crypto"
import { prisma } from "@/lib/prisma"

const MFA_TTL_MINUTES = 10
const MFA_MAX_ATTEMPTS = 5

function hashCode(code: string) {
  return crypto
    .createHmac("sha256", process.env.NEXTAUTH_SECRET || "development-secret")
    .update(code)
    .digest("hex")
}

function generateCode() {
  return crypto.randomInt(100000, 1000000).toString()
}

export async function createMfaChallenge(userId: string) {
  const code = generateCode()
  const expiresAt = new Date(Date.now() + MFA_TTL_MINUTES * 60 * 1000)

  await prisma.mfaChallenge.updateMany({
    where: {
      userId,
      consumedAt: null,
    },
    data: {
      consumedAt: new Date(),
    },
  })

  await prisma.mfaChallenge.create({
    data: {
      userId,
      codeHash: hashCode(code),
      expiresAt,
    },
  })

  return { code, expiresAt }
}

export async function verifyMfaCode(userId: string, code: string) {
  const challenge = await prisma.mfaChallenge.findFirst({
    where: {
      userId,
      consumedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (!challenge || challenge.attempts >= MFA_MAX_ATTEMPTS) {
    return false
  }

  const valid = challenge.codeHash === hashCode(code)

  if (!valid) {
    await prisma.mfaChallenge.update({
      where: { id: challenge.id },
      data: { attempts: { increment: 1 } },
    })
    return false
  }

  await prisma.mfaChallenge.update({
    where: { id: challenge.id },
    data: { consumedAt: new Date() },
  })

  return true
}

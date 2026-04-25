import { prisma } from "@/lib/prisma"

export function getClientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null
  )
}

export async function writeAuditLog({
  userId,
  action,
  entity,
  entityId,
  req,
}: {
  userId?: string | null
  action: string
  entity: string
  entityId: string
  req?: Request
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        ipAddress: req ? getClientIp(req) : null,
      },
    })
  } catch {
    console.error("Audit log write failed")
  }
}

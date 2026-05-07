import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { writeAuditLog } from "@/lib/audit"
import { paymentListSelect } from "@/lib/examSelect"
import { PaymentStatus } from "@prisma/client"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get("page") || 1)
  const limit = 10
  const skip = (page - 1) * limit

  const [payments, total, paid, pending, failed] = await Promise.all([
    prisma.exam.findMany({
      skip,
      take: limit,
      orderBy: { updatedAt: "desc" },
      select: paymentListSelect,
    }),

    prisma.exam.count(),

    prisma.exam.count({
      where: { paymentStatus: PaymentStatus.PAID },
    }),

    prisma.exam.count({
      where: { paymentStatus: PaymentStatus.PENDING },
    }),

    prisma.exam.count({
      where: { paymentStatus: PaymentStatus.FAILED },
    })
  ])

  await writeAuditLog({
    userId: session.user.id,
    action: "VIEW_ADMIN_PAYMENTS",
    entity: "Exam",
    entityId: "bulk",
    req,
  })

  return NextResponse.json({
    payments,
    stats: {
      total,
      paid,
      pending,
      failed,
    },
    total,
    page,
    totalPages: Math.ceil(total / limit)
  })
}

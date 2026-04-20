import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PaymentStatus, ExamStatus } from "@prisma/client"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Stats
  const [activeCases, blocked, payments, pendingPayments] = await Promise.all([
    prisma.exam.count({
      where: {
        status: {
          in: ["PENDING", "IN_PROGRESS"]
        }
      }
    }),

    prisma.exam.count({
      where: {
        status: "CANCELLED"
      }
    }),

    prisma.exam.count({
      where: {
        paymentStatus: PaymentStatus.PAID
      }
    }),

    prisma.exam.count({
      where: {
        paymentStatus: PaymentStatus.PENDING
      }
    })
  ])

  // Execution Monitoring (latest 10)
  const monitoring = await prisma.exam.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { patient: true }
  })

  // Recent Activity (latest updates)
  const activity = await prisma.exam.findMany({
    take: 5,
    orderBy: { updatedAt: "desc" },
    include: { patient: true }
  })

  // Payments (top 5 recent paid)
  const paymentsList = await prisma.exam.findMany({
    where: {
      paymentStatus: PaymentStatus.PENDING
    },
    take: 5,
    orderBy: { updatedAt: "desc" },
    include: { patient: true }
  })

  return NextResponse.json({
    stats: {
      activeCases,
      blocked,
      payments,
      pendingPayments
    },
    monitoring,
    activity,
    paymentsList
  })
}
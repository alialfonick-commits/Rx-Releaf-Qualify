import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "STAFF") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const staffId = session.user.id

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)

  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - 7)

  const [total, pending, completedToday, phoneVisits, createdToday, awaitingProvider, completedYesterday, phoneVisitsWeek] = await Promise.all([
    prisma.exam.count({
      where: { staffId }
    }),

    prisma.exam.count({
      where: {
        staffId,
        status: "PENDING"
      }
    }),

    prisma.exam.count({
      where: {
        staffId,
        status: "COMPLETED",
        updatedAt: { gte: startOfToday }
      }
    }),
    
    prisma.exam.count({
      where: {
        staffId,
        isPhoneVisit: true
      }
    }),

    prisma.exam.count({
      where: {
        staffId,
        createdAt: { gte: startOfToday }
      }
    }),

    prisma.exam.count({
      where: {
        staffId,
        providerName: null,
        status: {
          in: ["INVITED", "IN_PROGRESS"]
        }
      }
    }),

    prisma.exam.count({
      where: {
        staffId,
        status: "COMPLETED",
        updatedAt: {
          gte: startOfYesterday,
          lt: startOfToday
        }
      }
    }),

    prisma.exam.count({
      where: {
        staffId,
        isPhoneVisit: true,
        createdAt: { gte: startOfWeek }
      }
    })
  ])

  const cases = await prisma.exam.findMany({
    where: { staffId },
    include: { patient: true },
    orderBy: { createdAt: "desc" },
    take: 5
  })

  return NextResponse.json({
    stats: { total, pending, completedToday, phoneVisits, createdToday, awaitingProvider, completedYesterday, phoneVisitsWeek},
    cases
  })
}
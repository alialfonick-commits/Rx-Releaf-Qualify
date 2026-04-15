import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  try {
    // 📊 Metrics
    const [activeCases, pending, completedToday, phoneVisits] =
      await Promise.all([
        prisma.exam.count({
          where: {
            status: {
              notIn: ["COMPLETED", "CANCELLED"]
            }
          }
        }),

        prisma.exam.count({
          where: {
            status: "PENDING"
          }
        }),

        prisma.exam.count({
          where: {
            status: "COMPLETED",
            updatedAt: {
              gte: startOfToday
            }
          }
        }),

        prisma.exam.count({
          where: {
            isPhoneVisit: true
          }
        })
      ])

    // 📋 Recent Visits
    const recentVisits = await prisma.exam.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        patient: true
      }
    })

    return NextResponse.json({
      metrics: {
        activeCases,
        pending,
        completedToday,
        phoneVisits
      },
      visits: recentVisits
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
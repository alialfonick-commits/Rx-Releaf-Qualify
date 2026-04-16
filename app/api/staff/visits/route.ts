import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "STAFF") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const staffId = session.user.id

  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get("page") || 1)
  const limit = 10
  const skip = (page - 1) * limit

  const [visits, total] = await Promise.all([
    prisma.exam.findMany({
      where: { staffId },
      include: { patient: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),

    prisma.exam.count({
      where: { staffId }
    })
  ])

  return NextResponse.json({
    visits,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  })
}
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get("page") || 1)
  const limit = 10
  const skip = (page - 1) * limit

  const [payments, total] = await Promise.all([
    prisma.exam.findMany({
      skip,
      take: limit,
      orderBy: { updatedAt: "desc" },
      include: { patient: true }
    }),

    prisma.exam.count()
  ])

  return NextResponse.json({
    payments,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  })
}
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const baseWhere = {
    role: Role.STAFF,
    isDeleted: false
  }

  const [total, active, inactive, staff] = await Promise.all([
    prisma.user.count({ where: baseWhere }),
  
    prisma.user.count({
      where: { ...baseWhere, isActive: true }
    }),
  
    prisma.user.count({
      where: { ...baseWhere, isActive: false }
    }),
  
    prisma.user.findMany({
      where: baseWhere,
      orderBy: { createdAt: "desc" }
    })
  ])

  return NextResponse.json({
    stats: { total, active, inactive },
    staff
  })
}
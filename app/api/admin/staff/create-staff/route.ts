import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const { name, email, phone, password, isActive } = body

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  // 🔍 Check if exists
  const existing = await prisma.user.findUnique({
    where: { email }
  })

  if (existing) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    )
  }

  // 🔐 Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  const lastStaff = await prisma.user.findFirst({
    where: { role: "STAFF" },
    orderBy: { staffNumber: "desc" },
  })

  const nextStaffNumber = (lastStaff?.staffNumber || 0) + 1

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      role: "STAFF",
      isActive: isActive ?? true,
      staffNumber: nextStaffNumber,
    }
  })

  return NextResponse.json({ success: true, user })
}
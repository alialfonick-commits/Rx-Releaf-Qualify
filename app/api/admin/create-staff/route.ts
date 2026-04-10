import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient, Role } from "@prisma/client"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  // 🔒 Only admin allowed
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // ✅ Type the request body
  const body: { email: string; password: string } = await req.json()

  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  // ✅ Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    )
  }

  // 🔐 Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: Role.STAFF
    }
  })

  return NextResponse.json({
    message: "Staff created successfully",
    user
  })
}
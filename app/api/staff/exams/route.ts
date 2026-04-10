import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient, ConsultationType, BirthSex } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  // Only staff allowed
  if (!session || session.user.role !== "STAFF") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Typed request body
  const body: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dob: string
    birthSex: "MALE" | "FEMALE"
    patientState: string
    treatment: string
  } = await req.json()

  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    birthSex,
    patientState,
    treatment
  } = body

  // Basic validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !birthSex ||
    !patientState ||
    !treatment
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  // 👤 Create patient
  const patient = await prisma.patient.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      dob: new Date(dob),
      birthSex: birthSex as BirthSex
    }
  })

  // Generate fake payment link (for now)
  const paymentLink = `https://pay.example.com/${Date.now()}`

  // Create exam
  const exam = await prisma.exam.create({
    data: {
      patientId: patient.id,
      staffId: session.user.id,

      patientState,
      consultationType: ConsultationType.URGENT_CARE,
      examId: Math.floor(Math.random() * 100000),
      examName: treatment,

      paymentStatus: "PENDING",
      paymentLink
    }
  })

  return NextResponse.json({
    message: "Exam created successfully",
    exam
  })
}
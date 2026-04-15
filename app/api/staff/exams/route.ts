import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ConsultationType, BirthSex, PaymentStatus, ExamStatus } from "@prisma/client"
import { sendPaymentEmail } from "@/lib/sendEmail"
import { createPaymentLink } from "@/lib/square"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "STAFF") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const { visit, patient } = body

  if (!visit || !patient) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    birthSex
  } = patient

  const { state, examId, examName } = visit

  // Basic validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !birthSex ||
    !state ||
    !examId
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  try {
    const { url: paymentLink, id: paymentId } = await createPaymentLink(
      89,
      `${firstName} ${lastName} - ${examName}`
    )
  
    const existingPatient = await prisma.patient.findFirst({
      where: { email }
    })
  
    const parsedDOB = new Date(dob)
    if (isNaN(parsedDOB.getTime())) {
      return NextResponse.json({ error: "Invalid DOB" }, { status: 400 })
    }
  
    const createdPatient = existingPatient
      ? existingPatient
      : await prisma.patient.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          dob: parsedDOB,
          birthSex: birthSex as BirthSex
        }
      })
  
    const exam = await prisma.exam.create({
      data: {
        patientId: createdPatient.id,
        staffId: session.user.id,
  
        patientState: state,
        consultationType: ConsultationType.URGENT_CARE,
  
        examId: Number(examId),
        examName,
  
        status: ExamStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
  
        paymentLink,
        paymentId
      }
    })
  
    try {
      await sendPaymentEmail(email, paymentLink)
    } catch (err) {
      console.error("Email failed:", err)
    }
  
    return NextResponse.json({ success: true, exam })
  
  } catch (error) {
    console.error(error)
  
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
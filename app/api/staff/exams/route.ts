import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ConsultationType, BirthSex, PaymentStatus, ExamStatus } from "@prisma/client"
import { sendPaymentEmail } from "@/lib/sendEmail"
import { createPaymentLink } from "@/lib/square"
import { writeAuditLog } from "@/lib/audit"
import { rateLimit } from "@/lib/rateLimit"
import {
  isNonEmptyString,
  isValidBirthSex,
  isValidEmail,
  isValidPhone,
  parseDOB,
} from "@/lib/validation"

export async function POST(req: Request) {
  const limited = rateLimit(req, {
    key: "staff-exams",
    limit: 30,
    windowMs: 15 * 60 * 1000,
  })

  if (limited) {
    return limited
  }

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

  if (
    !isNonEmptyString(firstName) ||
    !isNonEmptyString(lastName) ||
    !isValidEmail(email) ||
    !isValidPhone(phone) ||
    !parseDOB(dob) ||
    !isValidBirthSex(birthSex) ||
    !isNonEmptyString(state) ||
    !examId
  ) {
    return NextResponse.json(
      { error: "Invalid or missing required fields" },
      { status: 400 }
    )
  }

  try {
    const { url: paymentLink, id: paymentId } = await createPaymentLink(
      89,
      examName || "Urgent Care Visit"
    )
  
    const existingPatient = await prisma.patient.findFirst({
      where: { email }
    })
  
    const parsedDOB = parseDOB(dob)
    if (!parsedDOB) {
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
      await sendPaymentEmail(
        email,
        `${firstName} ${lastName}`,
        paymentLink
      )
    } catch {
      console.error("Payment email failed")
    }

    await writeAuditLog({
      userId: session.user.id,
      action: "CREATE_STAFF_EXAM",
      entity: "Exam",
      entityId: exam.id,
      req,
    })
   
    return NextResponse.json({
      success: true,
      exam: {
        id: exam.id,
        caseNumber: exam.caseNumber,
        status: exam.status,
        paymentStatus: exam.paymentStatus,
      },
    })
   
  } catch {
    console.error("Staff exam creation failed")
  
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

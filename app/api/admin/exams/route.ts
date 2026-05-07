import { NextResponse } from "next/server"
import { BirthSex, ConsultationType, ExamStatus, PaymentStatus } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sendPaymentEmail } from "@/lib/sendEmail"
import { createPaymentLink } from "@/lib/square"
import { writeAuditLog } from "@/lib/audit"
import { rateLimit } from "@/lib/rateLimit"
import { isConsultationTypeKey } from "@/lib/consultationConfig"
import {
  isNonEmptyString,
  isValidBirthSex,
  isValidEmail,
  isValidPhone,
  parseDOB,
} from "@/lib/validation"

export async function POST(req: Request) {
  const limited = rateLimit(req, {
    key: "admin-exams",
    limit: 30,
    windowMs: 15 * 60 * 1000,
  })

  if (limited) {
    return limited
  }

  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { visit, patient } = await req.json()

  if (!visit || !patient) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { firstName, lastName, email, phone, dob, birthSex } = patient
  const { state, examId, examName, consultationType } = visit
  const parsedDOB = parseDOB(dob)

  if (
    !isNonEmptyString(firstName) ||
    !isNonEmptyString(lastName) ||
    !isValidEmail(email) ||
    !isValidPhone(phone) ||
    !parsedDOB ||
    !isValidBirthSex(birthSex) ||
    !isNonEmptyString(state) ||
    !isConsultationTypeKey(consultationType) ||
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
      where: { email },
    })

    const createdPatient = existingPatient
      ? existingPatient
      : await prisma.patient.create({
          data: {
            firstName,
            lastName,
            email,
            phone,
            dob: parsedDOB,
            birthSex: birthSex as BirthSex,
          },
        })

    const exam = await prisma.exam.create({
      data: {
        patientId: createdPatient.id,
        staffId: session.user.id,
        patientState: state,
        consultationType: consultationType as ConsultationType,
        examId: Number(examId),
        examName,
        status: ExamStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentLink,
        paymentId,
      },
    })

    try {
      await sendPaymentEmail(email, `${firstName} ${lastName}`, paymentLink)
    } catch {
      console.error("Admin exam payment email failed")
    }

    await writeAuditLog({
      userId: session.user.id,
      action: "CREATE_ADMIN_EXAM",
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
    console.error("Admin exam creation failed")

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

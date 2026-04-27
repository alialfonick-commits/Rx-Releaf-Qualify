import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPaymentEmail } from "@/lib/sendEmail"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { writeAuditLog } from "@/lib/audit"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "STAFF") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { examId, sendSMS, sendEmail } = await req.json()

  const exam = await prisma.exam.findFirst({
    where: {
      id: examId,
      staffId: session.user.id,
    },
    select: {
      id: true,
      paymentLink: true,
      patient: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })

  if (!exam || !exam.paymentLink) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (sendEmail) {
    try {
      await sendPaymentEmail(
        exam.patient.email,
        `${exam.patient.firstName} ${exam.patient.lastName}`,
        exam.paymentLink
      )
    } catch {
      console.error("Payment email failed")
    }
  }

  if (sendSMS) {
    console.error("Payment SMS requested but no HIPAA-approved SMS provider is configured")
  }

  await writeAuditLog({
    userId: session.user.id,
    action: "SEND_PAYMENT_LINK",
    entity: "Exam",
    entityId: exam.id,
    req,
  })

  return NextResponse.json({ success: true })
}

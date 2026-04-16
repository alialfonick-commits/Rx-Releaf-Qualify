import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPaymentEmail } from "@/lib/sendEmail"

export async function POST(req: Request) {
  const { examId } = await req.json()

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: { patient: true }
  })

  if (!exam || !exam.paymentLink) {
    return NextResponse.json({ success: false })
  }

  await sendPaymentEmail(
    exam.patient.email,
    `${exam.patient.firstName} ${exam.patient.lastName}`,
    exam.paymentLink
  )

  return NextResponse.json({ success: true })
}
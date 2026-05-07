import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendToQualiphy } from "@/lib/qualiphy"
import { ExamStatus, PaymentStatus } from "@prisma/client"
import { WebhooksHelper } from "square"
import { writeAuditLog } from "@/lib/audit"
import { updateExamAfterQualiphyInvite } from "@/lib/qualiphyExamUpdate"

export async function POST(req: Request) {
  try {
    const requestBody = await req.text()
    const signatureHeader = req.headers.get("x-square-hmacsha256-signature")
    const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY
    const notificationUrl = process.env.SQUARE_WEBHOOK_NOTIFICATION_URL

    if (!signatureHeader || !signatureKey || !notificationUrl) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const isValid = WebhooksHelper.verifySignature({
      requestBody,
      signatureHeader,
      signatureKey,
      notificationUrl,
    })

    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = JSON.parse(requestBody)

    console.log("Square Webhook:")

    const eventType = body?.type

    // Only handle successful payments
    if (eventType === "payment.created") {
      const payment = body?.data?.object?.payment
      
      if (!payment) return NextResponse.json({ received: true })
    
      if (payment.status !== "COMPLETED") {
        return NextResponse.json({ received: true })
      }
      
      const paymentId = payment.id
      
      const exam = await prisma.exam.findFirst({
        where: { paymentId },
        include: { patient: true }
      })
          
      if (!exam) {
        console.error("Exam not found")
        return NextResponse.json({ received: true })
      }
        
      // Prevent duplicate processing
      if (exam.paymentStatus === PaymentStatus.PAID) {
        console.log("Already processed:")
        return NextResponse.json({ received: true })
      }
        
      try {
        const qualiphyResult = await sendToQualiphy({
          examId: exam.examId,
          firstName: exam.patient.firstName,
          lastName: exam.patient.lastName,
          email: exam.patient.email,
          phone: exam.patient.phone,
          state: exam.patientState,
          dob: exam.patient.dob
        })
       
      console.log("Qualiphy invite sent")
        
      await updateExamAfterQualiphyInvite({
        examId: exam.id,
        status: ExamStatus.IN_PROGRESS,
        patientExamId: qualiphyResult.patientExamId,
        meetingUrl: qualiphyResult.meetingUrl,
        meetingUuid: qualiphyResult.meetingUuid,
      })

      await prisma.exam.update({
        where: { id: exam.id },
        data: {
          paymentStatus: PaymentStatus.PAID,
        },
      })

      await writeAuditLog({
        userId: null,
        action: "SQUARE_WEBHOOK_PAYMENT_PAID",
        entity: "Exam",
        entityId: exam.id,
        req,
      })
        
    } catch {
      console.error("Qualiphy invite failed")
        
        await prisma.exam.update({
          where: { id: exam.id },
          data: {
            paymentStatus: PaymentStatus.PAID
          }
        })

        await writeAuditLog({
          userId: null,
          action: "SQUARE_WEBHOOK_PAYMENT_PAID",
          entity: "Exam",
          entityId: exam.id,
          req,
        })
      }
    }

    return NextResponse.json({ received: true })

  } catch {
    console.error("Square webhook error")

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    )
  }
}

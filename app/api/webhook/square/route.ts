import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendToQualiphy } from "@/lib/qualiphy"
import { ExamStatus, PaymentStatus } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("Square Webhook:", body)

    const eventType = body?.type

    // ✅ Only handle successful payments
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
        
        // ✅ Prevent duplicate processing
        if (exam.paymentStatus === PaymentStatus.PAID) {
        console.log("Already processed:", exam.id)
        return NextResponse.json({ received: true })
        }
        
        try {
        const qualiphyRes = await sendToQualiphy({
            examId: exam.examId,
            firstName: exam.patient.firstName,
            lastName: exam.patient.lastName,
            email: exam.patient.email,
            phone: exam.patient.phone,
            state: exam.patientState,
            dob: exam.patient.dob
        })
        
        console.log("Qualiphy success:", {
            examId: exam.id,
            response: qualiphyRes
        })
        
        await prisma.exam.update({
            where: { id: exam.id },
            data: {
            paymentStatus: PaymentStatus.PAID,
            status: ExamStatus.IN_PROGRESS
            }
        })
        
        } catch (err) {
        console.error("Qualiphy failed:", err)
        
        await prisma.exam.update({
            where: { id: exam.id },
            data: {
            paymentStatus: PaymentStatus.PAID
            }
        })
        }
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error("Webhook error:", error)

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    )
  }
}
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ExamStatus } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("Qualiphy Webhook:", body)

    /**
     * MUST confirm actual payload from Qualiphy
     * This is assumed structure based on common pattern
     */

    const examId = body?.exam_id || body?.examId
    const status = body?.status
    const providerName = body?.provider_name || body?.provider

    if (!examId) {
      console.error("Missing examId")
      return NextResponse.json({ received: true })
    }

    // Find exam
    const exam = await prisma.exam.findFirst({
      where: { examId: Number(examId) }
    })

    if (!exam) {
      console.error("Exam not found:", examId)
      return NextResponse.json({ received: true })
    }

    // Prevent duplicate updates
    if (exam.status === ExamStatus.COMPLETED) {
      console.log("Already completed:", exam.id)
      return NextResponse.json({ received: true })
    }

    // Only handle completion
    if (status === "completed" || status === "COMPLETED") {
      await prisma.exam.update({
        where: { id: exam.id },
        data: {
          status: ExamStatus.COMPLETED,
          providerName: providerName || "Provider"
        }
      })

      console.log("Exam completed:", exam.id)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error("Qualiphy webhook error:", error)

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    )
  }
}
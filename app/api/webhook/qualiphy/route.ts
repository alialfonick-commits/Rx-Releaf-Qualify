import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ExamStatus } from "@prisma/client"
import { verifyWebhookSecret } from "@/lib/security"
import { writeAuditLog } from "@/lib/audit"

export async function POST(req: Request) {
  if (!verifyWebhookSecret(req, "QUALIPHY_WEBHOOK_SECRET")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()

    console.log("Qualiphy webhook received")

    /**
     * MUST confirm actual payload from Qualiphy
     * This is assumed structure based on common pattern
     */

    const examId = body?.exam_id || body?.examId
    const status = body?.status
    const providerName = body?.provider_name || body?.provider

    if (!examId) {
      console.error("Qualiphy webhook missing examId")
      return NextResponse.json({ received: true })
    }

    // Find exam
    const exam = await prisma.exam.findFirst({
      where: { examId: Number(examId) }
    })

    if (!exam) {
      console.error("Qualiphy webhook exam not found")
      return NextResponse.json({ received: true })
    }

    // Prevent duplicate updates
    if (exam.status === ExamStatus.COMPLETED) {
      console.log("Qualiphy webhook already completed")
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

      await writeAuditLog({
        userId: null,
        action: "QUALIPHY_WEBHOOK_COMPLETE_EXAM",
        entity: "Exam",
        entityId: exam.id,
        req,
      })

      console.log("Qualiphy webhook exam completed")
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

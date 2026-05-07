import { PaymentStatus } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { cancelQualiphyInvite } from "@/lib/qualiphyInvite"
import { writeAuditLog } from "@/lib/audit"

type ExamDeleteLookup = {
  id: string
  paymentStatus: PaymentStatus
  qualiphyPatientExamId: string | null
}

async function findExamForDelete(examId: string): Promise<ExamDeleteLookup | null> {
  const [exam] = await prisma.$queryRaw<ExamDeleteLookup[]>`
    SELECT
      id,
      "paymentStatus",
      "qualiphyPatientExamId"
    FROM "Exam"
    WHERE id = ${examId}
    LIMIT 1
  `

  return exam || null
}

export async function deleteExamWithQualiphyCancel({
  examId,
  userId,
  action,
  req,
}: {
  examId: string
  userId: string
  action: string
  req: Request
}) {
  const exam = await findExamForDelete(examId)

  if (!exam) {
    return {
      ok: false,
      status: 404,
      body: { error: "Visit not found" },
    }
  }

  if (exam.paymentStatus === PaymentStatus.PAID) {
    if (!exam.qualiphyPatientExamId) {
      return {
        ok: false,
        status: 409,
        body: { error: "Missing Qualiphy patient exam ID" },
      }
    }

    const cancelResult = await cancelQualiphyInvite(exam.qualiphyPatientExamId)

    if (!cancelResult.ok) {
      return {
        ok: false,
        status: 502,
        body: {
          error: "Qualiphy cancel failed",
          qualiphyStatus: cancelResult.status,
        },
      }
    }

    await writeAuditLog({
      userId,
      action: "CANCEL_QUALIPHY_INVITE",
      entity: "Exam",
      entityId: exam.id,
      req,
    })
  }

  await prisma.exam.delete({
    where: { id: exam.id },
  })

  await writeAuditLog({
    userId,
    action,
    entity: "Exam",
    entityId: exam.id,
    req,
  })

  return {
    ok: true,
    status: 200,
    body: { success: true },
  }
}

import { ExamStatus } from "@prisma/client"
import { prisma } from "@/lib/prisma"

type QualiphyExamUpdateInput = {
  examId: string
  status: ExamStatus
  patientExamId?: string | null
  meetingUrl?: string | null
  meetingUuid?: string | null
}

export async function updateExamAfterQualiphyInvite({
  examId,
  status,
  patientExamId,
  meetingUrl,
  meetingUuid,
}: QualiphyExamUpdateInput) {
  try {
    await prisma.exam.update({
      where: { id: examId },
      data: {
        status,
        ...(patientExamId ? { qualiphyPatientExamId: patientExamId } : {}),
        ...(meetingUrl ? { qualiphyMeetingUrl: meetingUrl } : {}),
        ...(meetingUuid ? { qualiphyMeetingUuid: meetingUuid } : {}),
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : ""

    if (!message.includes("Unknown argument `qualiphyPatientExamId`")) {
      throw error
    }

    console.error("Prisma client is missing Qualiphy fields. Run prisma migrate/generate.")

    await prisma.exam.update({
      where: { id: examId },
      data: { status },
    })
  }
}

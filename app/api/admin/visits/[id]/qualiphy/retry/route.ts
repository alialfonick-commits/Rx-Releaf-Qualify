import { NextResponse } from "next/server"
import { ExamStatus, PaymentStatus } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sendQualiphyInvite } from "@/lib/qualiphyInvite"
import { writeAuditLog } from "@/lib/audit"
import { updateExamAfterQualiphyInvite } from "@/lib/qualiphyExamUpdate"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !["ADMIN", "STAFF"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const exam = await prisma.exam.findUnique({
    where: { id },
    include: {
      patient: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          dob: true,
        },
      },
    },
  })

  if (!exam) {
    return NextResponse.json({ error: "Exam not found" }, { status: 404 })
  }

  if (exam.paymentStatus !== PaymentStatus.PAID) {
    return NextResponse.json(
      { error: "Cannot retry Qualiphy before payment is paid" },
      { status: 409 }
    )
  }

  if (exam.status !== ExamStatus.PENDING) {
    return NextResponse.json(
      { error: "Qualiphy invite is not retryable for this exam status" },
      { status: 409 }
    )
  }

  try {
    const result = await sendQualiphyInvite({
      examId: exam.examId,
      firstName: exam.patient.firstName,
      lastName: exam.patient.lastName,
      email: exam.patient.email,
      phone: exam.patient.phone,
      state: exam.patientState,
      dob: exam.patient.dob,
    })

    if (!result.ok) {
      console.error("Qualiphy retry failed", {
        status: result.status,
        examId: exam.id,
      })

      await writeAuditLog({
        userId: session.user.id,
        action: "RETRY_QUALIPHY_INVITE_FAILED",
        entity: "Exam",
        entityId: exam.id,
        req,
      })

      return NextResponse.json(
        {
          success: false,
          qualiphySent: false,
          qualiphyStatus: result.status,
        },
        { status: 502 }
      )
    }

    await updateExamAfterQualiphyInvite({
      examId: exam.id,
      status: ExamStatus.INVITED,
      patientExamId: result.patientExamId,
      meetingUrl: result.meetingUrl,
      meetingUuid: result.meetingUuid,
    })

    await writeAuditLog({
      userId: session.user.id,
      action: "RETRY_QUALIPHY_INVITE",
      entity: "Exam",
      entityId: exam.id,
      req,
    })

    return NextResponse.json({
      success: true,
      qualiphySent: true,
      qualiphyStatus: result.status,
    })
  } catch (error) {
    console.error("Qualiphy retry request failed", {
      examId: exam.id,
      error: error instanceof Error ? error.message : "Unknown error",
    })

    await writeAuditLog({
      userId: session.user.id,
      action: "RETRY_QUALIPHY_INVITE_FAILED",
      entity: "Exam",
      entityId: exam.id,
      req,
    })

    return NextResponse.json(
      { success: false, error: "Qualiphy retry failed" },
      { status: 500 }
    )
  }
}

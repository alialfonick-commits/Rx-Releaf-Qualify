import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { writeAuditLog } from "@/lib/audit"
import {
  classifyConsultationType,
  ensureConsultationTypes,
  getQualiphyExamId,
  getQualiphyExamTitle,
} from "@/lib/consultationConfig"

async function requireAdmin() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }

  return { session, response: null }
}

async function getConsultationSettings() {
  await ensureConsultationTypes()

  return prisma.consultationTypeSetting.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      options: {
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      },
    },
  })
}

export async function GET() {
  const { response } = await requireAdmin()

  if (response) return response

  const consultationTypes = await getConsultationSettings()
  return NextResponse.json({ consultationTypes })
}

export async function POST(req: Request) {
  const { session, response } = await requireAdmin()

  if (response) return response

  await ensureConsultationTypes()

  const res = await fetch(`${process.env.QUALIPHY_BASE_URL}/api/exam_list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: process.env.QUALIPHY_API_KEY,
    }),
  })

  if (!res.ok) {
    console.error("Qualiphy exam sync failed")
    return NextResponse.json({ error: "Failed to sync exams" }, { status: 500 })
  }

  const data = await res.json()
  const exams = Array.isArray(data.exams) ? data.exams : []
  const typeRecords = await prisma.consultationTypeSetting.findMany()
  const typeByKey = new Map(typeRecords.map((type) => [type.typeKey, type]))
  let synced = 0

  for (const exam of exams) {
    const title = getQualiphyExamTitle(exam)
    const qualiphyExamId = getQualiphyExamId(exam)
    const rxType = typeof exam.rx_type === "number" ? exam.rx_type : null
    const typeKey = classifyConsultationType(title, rxType)

    if (qualiphyExamId && !typeKey) {
      await prisma.consultationOptionSetting.deleteMany({
        where: { qualiphyExamId },
      })
      continue
    }

    if (!title || !qualiphyExamId || !typeKey) {
      continue
    }

    const consultationType = typeByKey.get(typeKey)

    if (!consultationType) {
      continue
    }

    await prisma.consultationOptionSetting.deleteMany({
      where: {
        qualiphyExamId,
        consultationTypeId: {
          not: consultationType.id,
        },
      },
    })

    await prisma.consultationOptionSetting.upsert({
      where: {
        consultationTypeId_qualiphyExamId: {
          consultationTypeId: consultationType.id,
          qualiphyExamId,
        },
      },
      create: {
        consultationTypeId: consultationType.id,
        qualiphyExamId,
        title,
        rxType,
        rawData: exam,
      },
      update: {
        title,
        rxType,
        rawData: exam,
      },
    })

    synced += 1
  }

  await writeAuditLog({
    userId: session?.user.id,
    action: "SYNC_CONSULTATION_OPTIONS",
    entity: "ConsultationOptionSetting",
    entityId: "bulk",
    req,
  })

  const consultationTypes = await getConsultationSettings()
  return NextResponse.json({ synced, consultationTypes })
}

export async function PATCH(req: Request) {
  const { session, response } = await requireAdmin()

  if (response) return response

  const body = await req.json()
  const entity = body.entity
  const id = typeof body.id === "string" ? body.id : ""
  const isEnabled = typeof body.isEnabled === "boolean" ? body.isEnabled : null

  if (!id || isEnabled === null || (entity !== "type" && entity !== "option")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  if (entity === "type") {
    await prisma.consultationTypeSetting.update({
      where: { id },
      data: { isEnabled },
    })
  } else {
    await prisma.consultationOptionSetting.update({
      where: { id },
      data: { isEnabled },
    })
  }

  await writeAuditLog({
    userId: session?.user.id,
    action: entity === "type" ? "UPDATE_CONSULTATION_TYPE_VISIBILITY" : "UPDATE_CONSULTATION_OPTION_VISIBILITY",
    entity: entity === "type" ? "ConsultationTypeSetting" : "ConsultationOptionSetting",
    entityId: id,
    req,
  })

  const consultationTypes = await getConsultationSettings()
  return NextResponse.json({ consultationTypes })
}

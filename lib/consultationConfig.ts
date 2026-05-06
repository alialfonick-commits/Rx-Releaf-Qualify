import { prisma } from "@/lib/prisma"

export const CONSULTATION_TYPES = [
  {
    typeKey: "GOOD_FAITH",
    label: "Good Faith Exam & Orders",
    sortOrder: 10,
  },
  {
    typeKey: "QUALIPHY_RX",
    label: "QualiphyRx Packages: Consultation + Medication Delivery Made Easy",
    sortOrder: 20,
  },
  {
    typeKey: "URGENT_CARE",
    label: "Urgent Care Visit: Consultation + Prescription Sent to Your Pharmacy",
    sortOrder: 30,
  },
  {
    typeKey: "CHOOSE_PHARMACY",
    label: "Choose Your Pharmacy (Consultation and Prescription Only)",
    sortOrder: 40,
  },
] as const

export type ConsultationTypeKey = (typeof CONSULTATION_TYPES)[number]["typeKey"]

type QualiphyExam = {
  id?: number
  exam_id?: number
  examId?: number
  title?: string
  name?: string
  rx_type?: number
  [key: string]: unknown
}

export function classifyConsultationType(title: string, rxType?: number | null): ConsultationTypeKey | null {
  const normalized = title.toLowerCase()

  if (normalized.includes("automation test") || normalized.includes("pbm example")) {
    return null
  }

  if (
    normalized.includes("rx only") ||
    normalized.includes("lillydirect") ||
    normalized.includes("prescription only")
  ) {
    return "CHOOSE_PHARMACY"
  }
  if (
    normalized.includes("medication shipping") ||
    normalized.includes("3 month supply") ||
    normalized.startsWith("async compounded") ||
    normalized.includes("methylene blue capsules")
  ) {
    return "QUALIPHY_RX"
  }
  if (normalized.includes("qualiphyrx")) return "QUALIPHY_RX"
  if (normalized.includes("choose your pharmacy")) return "CHOOSE_PHARMACY"
  if (normalized.includes("urgent care") || rxType === 2) return "URGENT_CARE"
  if (rxType === 1 || normalized.includes("good faith")) return "GOOD_FAITH"

  return null
}

export function isConsultationTypeKey(value: unknown): value is ConsultationTypeKey {
  return CONSULTATION_TYPES.some((type) => type.typeKey === value)
}

export function getQualiphyExamId(exam: QualiphyExam) {
  return exam.id ?? exam.exam_id ?? exam.examId ?? null
}

export function getQualiphyExamTitle(exam: QualiphyExam) {
  return exam.title ?? exam.name ?? ""
}

export async function ensureConsultationTypes() {
  await Promise.all(
    CONSULTATION_TYPES.map((type) =>
      prisma.consultationTypeSetting.upsert({
        where: { typeKey: type.typeKey },
        create: type,
        update: {
          label: type.label,
          sortOrder: type.sortOrder,
        },
      })
    )
  )
}

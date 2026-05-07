function formatDOB(dob: Date) {
  const year = dob.getFullYear()
  const month = String(dob.getMonth() + 1).padStart(2, "0")
  const day = String(dob.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

async function readJsonOrText(res: Response) {
  const text = await res.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export type QualiphyInviteInput = {
  examId: number
  firstName: string
  lastName: string
  email: string
  phone: string
  state: string
  dob: Date
}

export type QualiphyInviteResult = {
  ok: boolean
  status: number
  patientExamId: string | null
  meetingUrl: string | null
  meetingUuid: string | null
}

function getNestedString(value: unknown, path: string[]) {
  let current = value

  for (const key of path) {
    if (!current || typeof current !== "object" || !(key in current)) {
      return null
    }

    current = (current as Record<string, unknown>)[key]
  }

  if (typeof current === "string" || typeof current === "number") {
    return String(current)
  }

  return null
}

function extractPatientExamId(data: unknown) {
  return (
    getNestedString(data, ["patient_exam_id"]) ||
    getNestedString(data, ["patientExamId"]) ||
    getNestedString(data, ["data", "patient_exam_id"]) ||
    getNestedString(data, ["data", "patientExamId"]) ||
    getNestedString(data, ["patient_exam", "id"]) ||
    getNestedString(data, ["data", "patient_exam", "id"]) ||
    getNestedString(data, ["patient_exams", "0", "patient_exam_id"]) ||
    getNestedString(data, ["data", "patient_exams", "0", "patient_exam_id"])
  )
}

function buildQualiphyResult(response: Response, data: unknown): QualiphyInviteResult {
  return {
    ok: response.ok,
    status: response.status,
    patientExamId: extractPatientExamId(data),
    meetingUrl:
      getNestedString(data, ["meeting_url"]) ||
      getNestedString(data, ["meetingUrl"]) ||
      getNestedString(data, ["data", "meeting_url"]) ||
      getNestedString(data, ["data", "meetingUrl"]),
    meetingUuid:
      getNestedString(data, ["meeting_uuid"]) ||
      getNestedString(data, ["meetingUuid"]) ||
      getNestedString(data, ["data", "meeting_uuid"]) ||
      getNestedString(data, ["data", "meetingUuid"]),
  }
}

export function getQualiphyConfig({ requireWebhook = true } = {}) {
  const baseUrl = process.env.QUALIPHY_BASE_URL
  const apiKey = process.env.QUALIPHY_API_KEY
  const webhookBaseUrl = process.env.WEBHOOK_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL

  if (
    typeof baseUrl !== "string" ||
    baseUrl.trim().length === 0 ||
    typeof apiKey !== "string" ||
    apiKey.trim().length === 0
  ) {
    return null
  }

  if (
    requireWebhook &&
    (typeof webhookBaseUrl !== "string" || webhookBaseUrl.trim().length === 0)
  ) {
    return null
  }

  const normalizedBaseUrl = baseUrl.trim().replace(/\/$/, "")

  return {
    apiKey: apiKey.trim(),
    inviteUrl: `${normalizedBaseUrl}/api/exam_invite`,
    cancelUrl: `${normalizedBaseUrl}/api/exam_invite_cancel`,
    webhookUrl: webhookBaseUrl
      ? `${webhookBaseUrl.trim().replace(/\/$/, "")}/api/webhook/qualiphy`
      : null,
  }
}

export const getQualiphyInviteConfig = getQualiphyConfig

export async function sendQualiphyInvite(
  input: QualiphyInviteInput
): Promise<QualiphyInviteResult> {
  const config = getQualiphyConfig()

  if (!config || !config.webhookUrl) {
    throw new Error("Missing Qualiphy configuration")
  }

  const response = await fetch(config.inviteUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: config.apiKey,
      exams: input.examId,
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      phone_number: input.phone,
      tele_state: input.state,
      dob: formatDOB(input.dob),
      webhook_url: config.webhookUrl,
    }),
  })

  const data = await readJsonOrText(response)

  return buildQualiphyResult(response, data)
}

export async function cancelQualiphyInvite(patientExamId: string) {
  const config = getQualiphyConfig({ requireWebhook: false })

  if (!config) {
    throw new Error("Missing Qualiphy configuration")
  }

  const response = await fetch(config.cancelUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patient_exam_id: patientExamId,
      api_key: config.apiKey,
    }),
  })

  await readJsonOrText(response)

  return {
    ok: response.ok,
    status: response.status,
  }
}

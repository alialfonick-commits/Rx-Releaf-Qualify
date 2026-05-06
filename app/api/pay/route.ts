import { SquareClient, SquareEnvironment } from "square"
import { v4 as uuid } from "uuid"
import { NextResponse } from "next/server"
import { BirthSex, ConsultationType, ExamStatus, PaymentStatus } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { writeAuditLog } from "@/lib/audit"
import { rateLimit } from "@/lib/rateLimit"
import { isConsultationTypeKey } from "@/lib/consultationConfig"
import {
  isNonEmptyString,
  isValidBirthSex,
  isValidEmail,
  isValidPhone,
  parseDOB,
  parsePositiveNumber,
} from "@/lib/validation"

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.SQUARE_ENVIRONMENT === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
})

function formatDOB(dob: Date) {
  const year = dob.getFullYear()
  const month = String(dob.getMonth() + 1).padStart(2, "0")
  const day = String(dob.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function normalizeSquarePhone(phone: string) {
  const digits = phone.replace(/\D/g, "")

  if (digits.length === 10) {
    return `+1${digits}`
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`
  }

  if (phone.trim().startsWith("+") && digits.length >= 9 && digits.length <= 16) {
    return phone.trim()
  }

  return undefined
}

function truncateSquareText(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value
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

export async function POST(req: Request) {
  const limited = rateLimit(req, {
    key: "pay",
    limit: 20,
    windowMs: 15 * 60 * 1000,
  })

  if (limited) {
    return limited
  }

  try {
    const body = await req.json()
    const { token, amount, visit, patient } = body
    const amountValue = parsePositiveNumber(amount)
    const parsedDOB = parseDOB(patient?.dob)
    const squareLocationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
    const qualiphyBaseUrl = process.env.QUALIPHY_BASE_URL
    const qualiphyApiKey = process.env.QUALIPHY_API_KEY
    const webhookBaseUrl = process.env.WEBHOOK_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL

    if (
      !isNonEmptyString(token) ||
      !amountValue ||
      amountValue > 5000 ||
      !visit ||
      !patient ||
      !isNonEmptyString(visit.state) ||
      !isConsultationTypeKey(visit.consultationType) ||
      !parsePositiveNumber(visit.examId) ||
      !isNonEmptyString(patient.firstName) ||
      !isNonEmptyString(patient.lastName) ||
      !isValidEmail(patient.email) ||
      !isValidPhone(patient.phone) ||
      !parsedDOB ||
      !isValidBirthSex(patient.birthSex)
    ) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    if (
      typeof process.env.SQUARE_ACCESS_TOKEN !== "string" ||
      process.env.SQUARE_ACCESS_TOKEN.trim().length === 0 ||
      typeof squareLocationId !== "string" ||
      squareLocationId.trim().length === 0 ||
      typeof qualiphyBaseUrl !== "string" ||
      qualiphyBaseUrl.trim().length === 0 ||
      typeof qualiphyApiKey !== "string" ||
      qualiphyApiKey.trim().length === 0 ||
      typeof webhookBaseUrl !== "string" ||
      webhookBaseUrl.trim().length === 0
    ) {
      console.error("Payment route missing required vendor configuration")
      return NextResponse.json({ error: "Payment configuration is incomplete" }, { status: 500 })
    }

    const squareLocation = squareLocationId.trim()
    const qualiphyInviteUrl = `${qualiphyBaseUrl.trim().replace(/\/$/, "")}/api/exam_invite`
    const qualiphyKey = qualiphyApiKey.trim()
    const qualiphyWebhookUrl = `${webhookBaseUrl.trim().replace(/\/$/, "")}/api/webhook/qualiphy`

    const referenceId = uuid()
    const serviceName = truncateSquareText(
      isNonEmptyString(visit.examName) ? visit.examName.trim() : "Consultation",
      255
    )
    const patientFirstName = patient.firstName.trim()
    const patientLastName = patient.lastName.trim()
    const patientEmail = patient.email.trim().toLowerCase()
    const patientPhone = patient.phone.trim()
    const squarePhone = normalizeSquarePhone(patientPhone)
    const amountCents = BigInt(Math.round(amountValue * 100))

    const squareCustomer = await client.customers.create({
      idempotencyKey: uuid(),
      givenName: patientFirstName,
      familyName: patientLastName,
      emailAddress: patientEmail,
      referenceId,
      note: "Rx ReLeaf patient payment",
      ...(squarePhone ? { phoneNumber: squarePhone } : {}),
    })

    const customerId = squareCustomer.customer?.id

    if (!customerId) {
      throw new Error("Square customer creation failed")
    }

    const squareOrder = await client.orders.create({
      idempotencyKey: uuid(),
      order: {
        locationId: squareLocation,
        customerId,
        referenceId,
        source: {
          name: "Rx ReLeaf",
        },
        lineItems: [
          {
            name: serviceName,
            quantity: "1",
            basePriceMoney: {
              amount: amountCents,
              currency: "USD",
            },
            metadata: {
              consultation_type: visit.consultationType,
              exam_id: String(visit.examId),
              reference_id: referenceId,
            },
          },
        ],
      },
    })

    const orderId = squareOrder.order?.id

    if (!orderId) {
      throw new Error("Square order creation failed")
    }

    const response = await client.payments.create({
      sourceId: token,
      idempotencyKey: uuid(),
      locationId: squareLocation,
      customerId,
      orderId,
      referenceId,
      buyerEmailAddress: patientEmail,
      note: truncateSquareText(`${serviceName} - ${patientFirstName} ${patientLastName}`, 500),
      amountMoney: {
        amount: amountCents,
        currency: "USD",
      },
    })

    const payment = response.payment // FIX

    if (!payment) {
      throw new Error("Payment failed")
    }

    const existingPatient = await prisma.patient.findFirst({
      where: { email: patientEmail }
    })
    
    const createdPatient = existingPatient
    ? existingPatient
    : await prisma.patient.create({
        data: {
          firstName: patientFirstName,
          lastName: patientLastName,
          email: patientEmail,
          phone: patientPhone,
          dob: parsedDOB,
          birthSex: patient.birthSex as BirthSex
        }
    })
    
    const exam = await prisma.exam.create({
      data: {
        patientId: createdPatient.id,
        staffId: null,
    
        patientState: visit.state,
        consultationType: visit.consultationType as ConsultationType,
        examId: Number(visit.examId),
        examName: isNonEmptyString(visit.examName) ? visit.examName : "Consultation",
    
        paymentStatus: PaymentStatus.PAID,
        paymentId: payment.id || referenceId,
        paymentLink: payment.receiptUrl
      }
    })

    if (process.env.HUBSPOT_PHI_ENABLED === "true") {
      try {
        await fetch(
          "https://api.hubapi.com/crm/v3/objects/contacts",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              properties: {
                email: patientEmail,
                firstname: patientFirstName,
                lastname: patientLastName,
                phone: patientPhone,
              },
            }),
          }
        )
      } catch {
        console.error("HubSpot API error")
      }
    }

    let qualiphySent = false
    let qualiphyStatus: number | null = null
 
    try {
      const qualiphyRes = await fetch(
        qualiphyInviteUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: qualiphyKey,
            exams: visit.examId,
            first_name: patientFirstName,
            last_name: patientLastName,
            email: patientEmail,
            phone_number: patientPhone,
            tele_state: visit.state,
            dob: formatDOB(parsedDOB),
            webhook_url: qualiphyWebhookUrl
          })
        }
      )

      qualiphyStatus = qualiphyRes.status
      await readJsonOrText(qualiphyRes)

      if (!qualiphyRes.ok) {
        console.error("Qualiphy invite failed", {
          status: qualiphyRes.status,
          examId: exam.id,
        })
      } else {
        qualiphySent = true

        await prisma.exam.update({
          where: { id: exam.id },
          data: { status: ExamStatus.INVITED },
        })

        await writeAuditLog({
          userId: null,
          action: "SEND_QUALIPHY_INVITE",
          entity: "Exam",
          entityId: exam.id,
          req,
        })
      }

    } catch (error) {
      console.error("Qualiphy invite request failed", {
        examId: exam.id,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }

    await writeAuditLog({
      userId: null,
      action: "CREATE_PUBLIC_PAID_EXAM",
      entity: "Exam",
      entityId: exam.id,
      req,
    })

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      orderId: payment.orderId,
      amount: Number(payment.amountMoney?.amount || 0) / 100,
      currency: payment.amountMoney?.currency,
      date: payment.createdAt,
      receiptUrl: payment.receiptUrl,
      status: payment.status,
      squareCustomerId: customerId,
      squareOrderId: orderId,
      referenceId,
      qualiphySent,
      qualiphyStatus
    })

  } catch (error) {
    console.error("Payment route failed", error instanceof Error ? error.message : "Unknown error")

    return NextResponse.json({
      success: false,
      error: "Payment failed",
    }, { status: 500 })
  }
}

import { SquareClient, SquareEnvironment } from "square"
import { v4 as uuid } from "uuid"
import { NextResponse } from "next/server"
import { BirthSex, ConsultationType, PaymentStatus } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { writeAuditLog } from "@/lib/audit"
import { rateLimit } from "@/lib/rateLimit"
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

export async function POST(req: Request) {
  const limited = rateLimit(req, {
    key: "pay",
    limit: 20,
    windowMs: 15 * 60 * 1000,
  })

  if (limited) {
    return limited
  }

  function formatDOB(dob: string) {
    // already correct format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      return dob
    }
  
    const date = new Date(dob)
  
    if (isNaN(date.getTime())) {
      throw new Error("Invalid DOB format")
    }
  
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
  
    return `${year}-${month}-${day}`
  }
  try {
    const body = await req.json()
    const { token, amount, visit, patient } = body
    const amountValue = parsePositiveNumber(amount)
    const parsedDOB = parseDOB(patient?.dob)

    if (
      !isNonEmptyString(token) ||
      !amountValue ||
      amountValue > 5000 ||
      !visit ||
      !patient ||
      !isNonEmptyString(visit.state) ||
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

    const response = await client.payments.create({
      sourceId: token,
      idempotencyKey: uuid(),
      amountMoney: {
        amount: BigInt(Math.round(amountValue * 100)),
        currency: "USD",
      },
    })

    const payment = response.payment // FIX

    if (!payment) {
      throw new Error("Payment failed")
    }

    const existingPatient = await prisma.patient.findFirst({
      where: { email: patient.email }
    })
    
    const createdPatient = existingPatient
    ? existingPatient
    : await prisma.patient.create({
        data: {
          firstName: patient.firstName,
          lastName: patient.lastName,
          email: patient.email,
          phone: patient.phone,
          dob: parsedDOB,
          birthSex: patient.birthSex as BirthSex
        }
    })
    
    const exam = await prisma.exam.create({
      data: {
        patientId: createdPatient.id,
        staffId: null,
    
        patientState: visit.state,
        consultationType: ConsultationType.URGENT_CARE,
        examId: Number(visit.examId),
        examName: "Urgent Care Visit",
    
        paymentStatus: PaymentStatus.PAID,
        paymentId: payment.id,
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
                email: patient.email,
                firstname: patient.firstName,
                lastname: patient.lastName,
                phone: patient.phone,
              },
            }),
          }
        )
      } catch {
        console.error("HubSpot API error")
      }
    }

    let qualiphyData = null
 
    try {
      const qualiphyRes = await fetch(
        `https://api.qualiphy.me/api/exam_invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: process.env.QUALIPHY_API_KEY,
            exams: visit.examId,
            first_name: patient.firstName,
            last_name: patient.lastName,
            email: patient.email,
            phone_number: patient.phone,
            tele_state: visit.state,
            dob: formatDOB(patient.dob),
            webhook_url: `${process.env.WEBHOOK_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/qualiphy`
          })
        }
      )

      qualiphyData = await qualiphyRes.json()

    } catch {
      console.error("Qualiphy API error")
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
      qualiphySent: Boolean(qualiphyData)
    })

  } catch {
    console.error("Payment route failed")

    return NextResponse.json({
      success: false,
      error: "Payment failed",
    }, { status: 500 })
  }
}

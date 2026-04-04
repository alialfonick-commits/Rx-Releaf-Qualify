import { SquareClient, SquareEnvironment } from "square"
import { v4 as uuid } from "uuid"
import { NextResponse } from "next/server"

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox,
})

export async function POST(req: Request) {
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

    const response = await client.payments.create({
      sourceId: token,
      idempotencyKey: uuid(),
      amountMoney: {
        amount: BigInt(Math.round(amount * 100)),
        currency: "USD",
      },
    })

    const payment = response.payment // FIX

    if (!payment) {
      throw new Error("Payment failed")
    }

    let hubspotData = null

    try {
      const hubspotRes = await fetch(
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

      hubspotData = await hubspotRes.json()
      console.log("HubSpot:", hubspotData)

    } catch (err) {
      console.error("HubSpot API error:", err)
    }

    let qualiphyData = null
    console.log(formatDOB(patient.dob))
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
          })
        }
      )

      qualiphyData = await qualiphyRes.json()
      console.log(qualiphyData)
    } catch (err) {
      console.error("Qualiphy API error:", err)
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      orderId: payment.orderId,
      amount: Number(payment.amountMoney?.amount || 0) / 100,
      currency: payment.amountMoney?.currency,
      date: payment.createdAt,
      receiptUrl: payment.receiptUrl,
      status: payment.status,
      qualiphy: qualiphyData
    })

  } catch (error: any) {
    console.error(error)

    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
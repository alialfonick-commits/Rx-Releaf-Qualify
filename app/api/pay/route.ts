import { SquareClient, SquareEnvironment } from "square"
import { v4 as uuid } from "uuid"
import { NextResponse } from "next/server"

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token, amount } = body

    const response = await client.payments.create({
      sourceId: token,
      idempotencyKey: uuid(),
      amountMoney: {
        amount: BigInt(Math.round(amount * 100)),
        currency: "USD",
      },
    })

    const payment = response.payment // ✅ FIX

    if (!payment) {
      throw new Error("Payment failed")
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
    })

  } catch (error: any) {
    console.error(error)

    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
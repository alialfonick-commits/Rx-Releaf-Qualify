import { SquareClient, SquareEnvironment } from "square"
import { randomUUID } from "crypto"

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox,
})

export async function createPaymentLink(amount: number, description: string) {
  const response = await client.checkout.paymentLinks.create({
    idempotencyKey: randomUUID(),

    quickPay: {
        name: description,
        priceMoney: {
          amount: BigInt(amount * 100),
          currency: "USD",
        },
        locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
    },
  })

  const url = response.paymentLink?.url

  if (!url) {
    throw new Error("Failed to create payment link")
  }

  return {
    url,
    id: response.paymentLink?.id
  }
}
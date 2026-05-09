import { SquareClient, SquareEnvironment } from "square"
import { randomUUID } from "crypto"

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.SQUARE_ENVIRONMENT === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
})

function truncateSquareText(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value
}

export async function createPaymentLink(amount: number, description: string) {
  const locationId = process.env.SQUARE_LOCATION_ID || process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID

  if (
    typeof process.env.SQUARE_ACCESS_TOKEN !== "string" ||
    process.env.SQUARE_ACCESS_TOKEN.trim().length === 0 ||
    typeof locationId !== "string" ||
    locationId.trim().length === 0
  ) {
    throw new Error("Square payment link configuration is incomplete")
  }

  const response = await client.checkout.paymentLinks.create({
    idempotencyKey: randomUUID(),

    quickPay: {
        name: truncateSquareText(description || "Rx ReLeaf Consultation", 255),
        priceMoney: {
          amount: BigInt(amount * 100),
          currency: "USD",
        },
        locationId: locationId.trim(),
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

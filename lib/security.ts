import crypto from "crypto"

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)

  if (left.length !== right.length) {
    return false
  }

  return crypto.timingSafeEqual(left, right)
}

export function verifyWebhookSecret(req: Request, envName: string) {
  const configuredSecret = process.env[envName]
  const providedSecret = req.headers.get("x-webhook-secret")

  if (!configuredSecret || !providedSecret) {
    return false
  }

  return safeEqual(providedSecret, configuredSecret)
}

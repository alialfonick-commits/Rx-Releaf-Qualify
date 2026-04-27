import { NextResponse } from "next/server"
import { getClientIp } from "@/lib/audit"

type Bucket = {
  count: number
  resetAt: number
}

const globalForRateLimit = global as unknown as {
  rateLimitStore?: Map<string, Bucket>
}

const store = globalForRateLimit.rateLimitStore || new Map<string, Bucket>()

if (process.env.NODE_ENV !== "production") {
  globalForRateLimit.rateLimitStore = store
}

export function rateLimit(
  req: Request,
  {
    key,
    limit,
    windowMs,
  }: {
    key: string
    limit: number
    windowMs: number
  }
) {
  const now = Date.now()
  const ip = getClientIp(req) || "unknown"
  const bucketKey = `${key}:${ip}`
  const bucket = store.get(bucketKey)

  if (!bucket || bucket.resetAt <= now) {
    store.set(bucketKey, { count: 1, resetAt: now + windowMs })
    return null
  }

  bucket.count += 1

  if (bucket.count > limit) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((bucket.resetAt - now) / 1000)),
        },
      }
    )
  }

  return null
}

export function isRateLimitedKey({
  key,
  limit,
  windowMs,
}: {
  key: string
  limit: number
  windowMs: number
}) {
  const now = Date.now()
  const bucket = store.get(key)

  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }

  bucket.count += 1

  return bucket.count > limit
}

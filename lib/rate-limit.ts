import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import type { NextRequest } from 'next/server'

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

const limiters = {
  contact: redis
    ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, '1 m'), prefix: 'ratelimit:contact' })
    : null,
  publish: redis
    ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, '1 m'), prefix: 'ratelimit:publish' })
    : null,
} as const

export type RateLimitScope = keyof typeof limiters

export function clientIp(req: NextRequest): string | null {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip')
}

export async function checkRateLimit(scope: RateLimitScope, identifier: string): Promise<boolean> {
  const limiter = limiters[scope]
  if (!limiter) return true // fail-open: sin credenciales configuradas (ej. local sin .env.local completo)
  const { success } = await limiter.limit(identifier)
  return success
}

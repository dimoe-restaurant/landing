import { timingSafeEqual } from 'crypto'
import { NextResponse } from 'next/server'
import { get } from '@vercel/blob'

export function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function readBlobJson(pathname: string): Promise<unknown[] | null> {
  const result = await get(pathname, { access: 'private', useCache: false })
  if (!result) return null
  const text = await new Response(result.stream).text()
  return JSON.parse(text) as unknown[]
}

export function htmlResponse(title: string, body: string): NextResponse {
  return new NextResponse(
    `<!doctype html><html><body style="font-family:system-ui,sans-serif;text-align:center;padding:64px"><h1>${title}</h1><p>${body}</p></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

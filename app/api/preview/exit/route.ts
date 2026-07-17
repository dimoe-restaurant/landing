import { timingSafeEqual } from 'crypto'
import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get('secret') ?? ''
  const expected = process.env.PUBLISH_SECRET ?? ''

  if (!expected || !secretsMatch(secret, expected)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const draft = await draftMode()
  draft.disable()

  return NextResponse.redirect(new URL('/carta', req.url))
}

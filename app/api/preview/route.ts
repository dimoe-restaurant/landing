import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { secretsMatch } from '@/lib/api-helpers'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get('secret') ?? ''
  const expected = process.env.PUBLISH_SECRET ?? ''

  if (!expected || !secretsMatch(secret, expected)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  return NextResponse.redirect(new URL('/es/carta', req.url))
}

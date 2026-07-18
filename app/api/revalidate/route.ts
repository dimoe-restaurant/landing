import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { secretsMatch } from '@/lib/api-helpers'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get('secret') ?? ''
  const expected = process.env.REVALIDATE_SECRET ?? ''
  const tag = req.nextUrl.searchParams.get('tag') ?? 'menu'

  if (!expected || !secretsMatch(secret, expected)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  revalidateTag(tag, 'max')
  return NextResponse.json({ revalidated: true, tag, ts: Date.now() })
}

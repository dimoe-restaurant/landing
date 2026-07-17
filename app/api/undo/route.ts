import { timingSafeEqual } from 'crypto'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { get, put } from '@vercel/blob'

export const maxDuration = 30

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

async function readBlobJson(pathname: string): Promise<unknown[] | null> {
  const result = await get(pathname, { access: 'private', useCache: false })
  if (!result) return null
  const text = await new Response(result.stream).text()
  return JSON.parse(text) as unknown[]
}

function htmlResponse(title: string, body: string): NextResponse {
  return new NextResponse(
    `<!doctype html><html><body style="font-family:system-ui,sans-serif;text-align:center;padding:64px"><h1>${title}</h1><p>${body}</p></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get('secret') ?? ''
  const expected = process.env.PUBLISH_SECRET ?? ''

  if (!expected || !secretsMatch(secret, expected)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const previous = await readBlobJson('menu-previous.json')
    if (previous === null) {
      return htmlResponse('⚠️ No hay versión anterior guardada', 'Todavía no se publicó ningún cambio para poder deshacerlo.')
    }

    await put('menu-live.json', JSON.stringify(previous), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    })

    revalidateTag('menu', 'max')

    return htmlResponse('↩️ Cambios revertidos', 'La carta volvió a la versión anterior.')
  } catch {
    return htmlResponse('⚠️ No se pudo deshacer', 'Hubo un problema al conectar con el almacenamiento. Probá de nuevo en unos minutos.')
  }
}

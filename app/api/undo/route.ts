import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { htmlResponse, readBlobJson, secretsMatch } from '@/lib/api-helpers'

export const maxDuration = 30

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

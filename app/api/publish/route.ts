import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { del, list, put } from '@vercel/blob'
import { htmlResponse, readBlobJson, secretsMatch } from '@/lib/api-helpers'

export const maxDuration = 60

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'
const MAX_SNAPSHOTS = 10

async function fetchNotionMenuRaw(): Promise<unknown[]> {
  const token = process.env.NOTION_ACCESS_TOKEN
  const dbId = process.env.NOTION_DB_MENU
  const results: unknown[] = []
  let cursor: string | undefined

  do {
    const res = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION,
      },
      body: JSON.stringify({
        filter: { property: 'Activo', checkbox: { equals: true } },
        sorts: [{ property: 'Orden', direction: 'ascending' }],
        page_size: 100,
        ...(cursor ? { start_cursor: cursor } : {}),
      }),
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Notion API respondió ${res.status}`)

    const data = await res.json() as { results: unknown[]; has_more: boolean; next_cursor: string | null }
    results.push(...data.results)
    cursor = data.has_more ? (data.next_cursor ?? undefined) : undefined
  } while (cursor)

  return results
}

async function writeBlobJson(pathname: string, data: unknown[]): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}

async function pruneOldSnapshots(): Promise<void> {
  const { blobs } = await list({ prefix: 'menu-snapshots/' })
  if (blobs.length <= MAX_SNAPSHOTS) return

  const sorted = [...blobs].sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
  const toDelete = sorted.slice(MAX_SNAPSHOTS).map(b => b.url)
  if (toDelete.length > 0) await del(toDelete)
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get('secret') ?? ''
  const expected = process.env.PUBLISH_SECRET ?? ''

  if (!expected || !secretsMatch(secret, expected)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const currentLive = await readBlobJson('menu-live.json')
    const fresh = await fetchNotionMenuRaw()

    if (currentLive !== null && JSON.stringify(fresh) === JSON.stringify(currentLive)) {
      return htmlResponse('ℹ️ Sin cambios que publicar', 'El contenido de Notion es igual al ya publicado — no se modificó nada.')
    }

    if (currentLive !== null) {
      await writeBlobJson('menu-previous.json', currentLive)
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      await writeBlobJson(`menu-snapshots/${timestamp}.json`, currentLive)
      await pruneOldSnapshots()
    }

    await writeBlobJson('menu-live.json', fresh)

    revalidateTag('menu', 'max')

    return htmlResponse('✅ Carta publicada', `${fresh.length} items actualizados.`)
  } catch {
    return htmlResponse('⚠️ No se pudo publicar', 'Hubo un problema al conectar con Notion o el almacenamiento. Probá de nuevo en unos minutos.')
  }
}

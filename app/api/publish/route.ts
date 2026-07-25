import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { del, list, put } from '@vercel/blob'
import { htmlResponse, readBlobJson, secretsMatch } from '@/lib/api-helpers'
import { checkRateLimit, clientIp } from '@/lib/rate-limit'

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
        sorts: [
          { property: 'Orden Sección', direction: 'ascending' },
          { property: 'Orden', direction: 'ascending' },
        ],
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

type NotionRawPage = { id: string }

function diffMenuPages(before: unknown[] | null, after: unknown[]): { added: number; modified: number; removed: number } {
  const beforeById = new Map((before ?? []).map(p => [(p as NotionRawPage).id, p]))
  const afterIds = new Set(after.map(p => (p as NotionRawPage).id))

  let added = 0
  let modified = 0
  for (const p of after) {
    const prev = beforeById.get((p as NotionRawPage).id)
    if (!prev) added++
    else if (JSON.stringify(prev) !== JSON.stringify(p)) modified++
  }

  let removed = 0
  for (const id of beforeById.keys()) {
    if (!afterIds.has(id)) removed++
  }

  return { added, modified, removed }
}

function formatDiff({ added, modified, removed }: { added: number; modified: number; removed: number }): string {
  const parts: string[] = []
  if (added) parts.push(`${added} agregado${added === 1 ? '' : 's'}`)
  if (modified) parts.push(`${modified} modificado${modified === 1 ? '' : 's'}`)
  if (removed) parts.push(`${removed} eliminado${removed === 1 ? '' : 's'}`)
  return parts.join(', ') || 'sin cambios detectados'
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get('secret') ?? ''
  const expected = process.env.PUBLISH_SECRET ?? ''

  if (!expected || !secretsMatch(secret, expected)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const allowed = await checkRateLimit('publish', clientIp(req) ?? 'unknown')
  if (!allowed) {
    return NextResponse.json({ error: 'too many requests' }, { status: 429 })
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

    const diff = formatDiff(diffMenuPages(currentLive, fresh))
    return htmlResponse('✅ Carta publicada', `${fresh.length} items en el menú — ${diff}.`)
  } catch {
    return htmlResponse('⚠️ No se pudo publicar', 'Hubo un problema al conectar con Notion o el almacenamiento. Probá de nuevo en unos minutos.')
  }
}

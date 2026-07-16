import { unstable_cache } from 'next/cache'
import { get } from '@vercel/blob'

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

export type MenuTab = 'ENTRADAS' | 'PIZZAS' | 'FONDOS' | 'POSTRES' | 'BAR' | 'VINOS' | 'SEMANAL'

export type MenuItem = {
  name: string
  desc?: string
  price: number | string
  badge?: string
  note?: string
}

export type MenuGroup = {
  name?: string
  subtitle?: string
  items: MenuItem[]
}

type NotionText = { plain_text: string }

type NotionMenuPage = {
  properties: {
    Nombre: { title: NotionText[] }
    'Nombre EN': { rich_text: NotionText[] }
    Descripción: { rich_text: NotionText[] }
    'Descripción EN': { rich_text: NotionText[] }
    Precio: { number: number | null }
    Categoría: { select: { name: string } | null }
    Subcategoría: { select: { name: string } | null }
    Tag: { select: { name: string } | null }
    Nota: { rich_text: NotionText[] }
    Badge: { rich_text: NotionText[] }
    Orden: { number: number | null }
    // Días activos — L=Lunes M=Martes W=Miércoles J=Jueves V=Viernes S=Sábado D=Domingo
    // Todos en false (default) = mostrar siempre. Al menos uno en true = mostrar sólo ese(os) día(s).
    L?: { checkbox: boolean }
    M?: { checkbox: boolean }
    W?: { checkbox: boolean }
    J?: { checkbox: boolean }
    V?: { checkbox: boolean }
    S?: { checkbox: boolean }
    D?: { checkbox: boolean }
  }
}

const VALID_TABS = new Set<string>(['ENTRADAS', 'PIZZAS', 'FONDOS', 'POSTRES', 'BAR', 'VINOS', 'SEMANAL'])

function parseMenuPages(
  pages: NotionMenuPage[],
  isEn: boolean,
): Record<MenuTab, MenuGroup[]> {
  const byTab = new Map<MenuTab, Map<string, MenuItem[]>>()

  for (const page of pages) {
    const p = page.properties
    const tab = (p.Categoría?.select?.name ?? '').toUpperCase()
    if (!VALID_TABS.has(tab)) continue

    const subcat = p.Subcategoría?.select?.name ?? ''
    const menuTab = tab as MenuTab

    if (!byTab.has(menuTab)) byTab.set(menuTab, new Map())
    const groups = byTab.get(menuTab)!
    if (!groups.has(subcat)) groups.set(subcat, [])

    // Filtro de días: 0=Dom 1=Lun 2=Mar 3=Mié 4=Jue 5=Vie 6=Sáb
    const DAY_KEYS = ['D', 'L', 'M', 'W', 'J', 'V', 'S'] as const
    const todayKey = DAY_KEYS[new Date().getDay()]
    const anyDaySet = (['L', 'M', 'W', 'J', 'V', 'S', 'D'] as const).some(k => p[k]?.checkbox === true)
    if (anyDaySet && !p[todayKey]?.checkbox) continue

    const nameEs = p.Nombre?.title?.[0]?.plain_text ?? ''
    const nameEn = p['Nombre EN']?.rich_text?.[0]?.plain_text ?? ''
    const descEs = p.Descripción?.rich_text?.[0]?.plain_text ?? ''
    const descEn = p['Descripción EN']?.rich_text?.[0]?.plain_text ?? ''
    const badge = p.Tag?.select?.name ?? p.Badge?.rich_text?.[0]?.plain_text ?? ''

    const item: MenuItem = {
      name: isEn && nameEn ? nameEn : nameEs,
      desc: (isEn && descEn ? descEn : descEs) || undefined,
      price: p.Precio?.number ?? '',
      badge: badge || undefined,
      note: p.Nota?.rich_text?.[0]?.plain_text || undefined,
    }

    groups.get(subcat)!.push(item)
  }

  const result = {} as Record<MenuTab, MenuGroup[]>
  for (const tab of ['ENTRADAS', 'PIZZAS', 'FONDOS', 'POSTRES', 'BAR', 'VINOS', 'SEMANAL'] as MenuTab[]) {
    const groups = byTab.get(tab)
    if (!groups) {
      result[tab] = []
      continue
    }
    result[tab] = Array.from(groups.entries()).map(([name, items]) => ({
      name: name || undefined,
      items,
    }))
  }

  return result
}

const getPublishedMenuPages = unstable_cache(
  async (): Promise<NotionMenuPage[] | null> => {
    try {
      const result = await get('menu-live.json', { access: 'private', useCache: false })
      if (!result) return null
      const text = await new Response(result.stream).text()
      return JSON.parse(text) as NotionMenuPage[]
    } catch {
      return null
    }
  },
  ['menu-live-snapshot'],
  { tags: ['menu'] },
)

export async function getMenu(
  locale: string,
): Promise<Record<MenuTab, MenuGroup[]> | null> {
  const isEn = locale === 'en'
  const pages = await getPublishedMenuPages()
  if (!pages) return null
  return parseMenuPages(pages, isEn)
}

/**
 * Igual que getMenu, pero pega directo a Notion sin pasar por el Blob publicado
 * ni el cache de Next — para el modo preview (Draft Mode), donde se quiere ver
 * el estado actual de Notion aunque todavía no se haya publicado.
 */
export async function getMenuPreview(
  locale: string,
): Promise<Record<MenuTab, MenuGroup[]> | null> {
  const token = process.env.NOTION_ACCESS_TOKEN
  const dbId = process.env.NOTION_DB_MENU
  if (!token || !dbId || token.length < 10) return null

  const isEn = locale === 'en'

  try {
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
        page_size: 200,
      }),
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data = await res.json() as { results: NotionMenuPage[]; has_more: boolean }
    return parseMenuPages(data.results, isEn)
  } catch {
    return null
  }
}

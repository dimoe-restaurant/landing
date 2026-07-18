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
  vegetariano?: boolean
  picante?: boolean
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
    Vegetariano?: { checkbox: boolean }
    Picante?: { checkbox: boolean }
    // Orden de dos niveles: 'Orden Sección' ordena los grupos entre sí
    // (Happy Hour, Cervezas, ...) y 'Orden' ordena los productos dentro de
    // su propia sección — así reordenar un producto nunca requiere tocar
    // el número de otra sección ni usar decimales para "hacer espacio".
    'Orden Sección': { number: number | null }
    Orden: { number: number | null }
    // Días en que el ítem aparece — convención: se marcan explícitamente
    // TODOS los días en que corresponde mostrarlo (incluye "siempre" = los
    // 7 marcados), nunca se confía en dejarlos en blanco para eso. Un ítem
    // recién creado sin marcar ningún día simplemente se muestra siempre
    // (red de seguridad — no rompe contenido nuevo sin configurar), pero la
    // práctica esperada es marcar explícito.
    Lunes?: { checkbox: boolean }
    Martes?: { checkbox: boolean }
    Miércoles?: { checkbox: boolean }
    Jueves?: { checkbox: boolean }
    Viernes?: { checkbox: boolean }
    Sábado?: { checkbox: boolean }
    Domingo?: { checkbox: boolean }
  }
}

const VALID_TABS = new Set<string>(['ENTRADAS', 'PIZZAS', 'FONDOS', 'POSTRES', 'BAR', 'VINOS', 'SEMANAL'])

const DAY_KEYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] as const

// El servidor de Vercel corre en UTC — Chile es UTC-3/-4, así que el día de
// la semana hay que calcularlo en su propia timezone, no con Date.getDay().
const WEEKDAY_TO_KEY = { Sun: 'Domingo', Mon: 'Lunes', Tue: 'Martes', Wed: 'Miércoles', Thu: 'Jueves', Fri: 'Viernes', Sat: 'Sábado' } as const
const CHILE_WEEKDAY_FORMATTER = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', weekday: 'short' })

function parseMenuPages(
  pages: NotionMenuPage[],
  isEn: boolean,
): Record<MenuTab, MenuGroup[]> {
  const byTab = new Map<MenuTab, Map<string, MenuItem[]>>()
  const todayKey = WEEKDAY_TO_KEY[CHILE_WEEKDAY_FORMATTER.format(new Date()) as keyof typeof WEEKDAY_TO_KEY]

  for (const page of pages) {
    const p = page.properties
    const tab = (p.Categoría?.select?.name ?? '').toUpperCase()
    if (!VALID_TABS.has(tab)) continue

    const subcat = p.Subcategoría?.select?.name ?? ''
    const menuTab = tab as MenuTab

    if (!byTab.has(menuTab)) byTab.set(menuTab, new Map())
    const groups = byTab.get(menuTab)!
    if (!groups.has(subcat)) groups.set(subcat, [])

    // Filtro de días
    const anyDaySet = DAY_KEYS.some(k => p[k]?.checkbox === true)
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
      vegetariano: p.Vegetariano?.checkbox || undefined,
      picante: p.Picante?.checkbox || undefined,
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
    // Un grupo puede quedar vacío si TODOS sus ítems se filtraron por el
    // filtro de días (ej. Happy Hour un sábado) — sin esto, el banner del
    // grupo (o su subtab) se renderiza igual con cero ítems debajo.
    result[tab] = Array.from(groups.entries())
      .filter(([, items]) => items.length > 0)
      .map(([name, items]) => ({
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
    const pages: NotionMenuPage[] = []
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

      if (!res.ok) return null

      const data = await res.json() as { results: NotionMenuPage[]; has_more: boolean; next_cursor: string | null }
      pages.push(...data.results)
      cursor = data.has_more ? (data.next_cursor ?? undefined) : undefined
    } while (cursor)

    return parseMenuPages(pages, isEn)
  } catch {
    return null
  }
}

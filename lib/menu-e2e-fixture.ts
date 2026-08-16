import type { MenuTab, MenuGroup } from './menu'

/**
 * Fixtures del flujo de preview para el gate E2E (#201/#202) — evita que los
 * tests dependan de credenciales/datos reales de Notion o Vercel Blob. Solo se
 * activan si PLAYWRIGHT_E2E=true (seteado únicamente por playwright.config.ts)
 * y el request trae el header x-e2e-menu-fixture, así que nunca se ejecutan
 * fuera del gate.
 */
export type E2EPreviewVariant = 'same' | 'diff' | 'notion-down'

function fixtureMenu(marker: string): Record<MenuTab, MenuGroup[]> {
  return {
    ENTRADAS: [{ items: [{ name: `E2E fixture — ${marker}`, price: 1000 }] }],
    PIZZAS: [],
    FONDOS: [],
    POSTRES: [],
    BAR: [],
    VINOS: [],
    SEMANAL: [],
  }
}

export function getE2EPreviewFixture(variant: E2EPreviewVariant): {
  notionData: Record<MenuTab, MenuGroup[]> | null
  publishedData: Record<MenuTab, MenuGroup[]> | null
} {
  if (variant === 'notion-down') {
    return { notionData: null, publishedData: fixtureMenu('published') }
  }
  if (variant === 'diff') {
    return { notionData: fixtureMenu('preview'), publishedData: fixtureMenu('published') }
  }
  const same = fixtureMenu('same')
  return { notionData: same, publishedData: same }
}

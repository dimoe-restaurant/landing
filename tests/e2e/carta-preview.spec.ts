import { test, expect } from '@playwright/test';
import { E2E_PUBLISH_SECRET } from './e2e-constants';

async function activatePreview(page: import('@playwright/test').Page) {
  await page.goto(`/api/preview?secret=${E2E_PUBLISH_SECRET}`);
}

function withFixtureHeader(page: import('@playwright/test').Page, variant: 'same' | 'diff' | 'notion-down') {
  return page.route('**/carta', route =>
    route.continue({ headers: { ...route.request().headers(), 'x-e2e-menu-fixture': variant } })
  );
}

test.describe('Flujo de preview de /carta (Draft Mode)', () => {
  // El LeadBanner (ver lead-banner.spec.ts) es un modal de pantalla completa que
  // aparece de inmediato en /carta y taparía el link "Salir de preview" — estos
  // tests validan el flujo de preview, no el lead banner.
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('dimoe_lead_carta_submitted', '1'));
  });

  test('activar preview via /api/preview habilita Draft Mode y redirige a /carta', async ({ page, context }) => {
    await activatePreview(page);
    await expect(page).toHaveURL(/\/carta$/);

    const cookies = await context.cookies();
    expect(cookies.some(c => c.name === '__prerender_bypass')).toBe(true);
  });

  test('preview activo sin diffs muestra "Modo preview activo"', async ({ page }) => {
    await activatePreview(page);
    await withFixtureHeader(page, 'same');
    await page.goto('/carta');

    await expect(page.getByText(/modo preview activo/i)).toBeVisible();
    await expect(page.getByText(/hay cambios sin publicar/i)).not.toBeVisible();
    await expect(page.getByText(/no se pudo conectar con notion/i)).not.toBeVisible();
  });

  test('preview activo con diffs muestra "Hay cambios sin publicar"', async ({ page }) => {
    await activatePreview(page);
    await withFixtureHeader(page, 'diff');
    await page.goto('/carta');

    await expect(page.getByText(/hay cambios sin publicar/i)).toBeVisible();
  });

  test('preview activo con Notion caído muestra "No se pudo conectar con Notion"', async ({ page }) => {
    await activatePreview(page);
    await withFixtureHeader(page, 'notion-down');
    await page.goto('/carta');

    await expect(page.getByText(/no se pudo conectar con notion/i)).toBeVisible();
  });

  test('salir de preview via /api/preview-exit borra la cookie y el banner desaparece', async ({ page, context }) => {
    await activatePreview(page);
    await withFixtureHeader(page, 'same');
    await page.goto('/carta');
    await expect(page.getByText(/modo preview activo/i)).toBeVisible();

    await page.getByRole('link', { name: /salir de preview/i }).click();

    const cookies = await context.cookies();
    expect(cookies.some(c => c.name === '__prerender_bypass')).toBe(false);
    await expect(page.getByText(/modo preview activo/i)).not.toBeVisible();
  });

  // Reusa el mismo fixture del flujo de preview (#201/#202) para probar el badge
  // AGOTADO (#285) sin depender de datos reales de Notion — FALLBACK_MENU no
  // tiene ningún ítem agotado hoy y no corresponde marcar uno real solo para test.
  test('ítem con agotado=true muestra el pill "AGOTADO" y el nombre tachado', async ({ page }) => {
    await activatePreview(page);
    await withFixtureHeader(page, 'same');
    await page.goto('/carta');
    await page.getByRole('button', { name: /ENTRADAS/ }).first().click();

    const itemName = page.getByText(/E2E fixture — same \(agotado\)/i);
    await expect(itemName).toBeVisible();
    await expect(itemName).toHaveCSS('text-decoration-line', 'line-through');
    await expect(page.getByText('AGOTADO', { exact: true })).toBeVisible();
  });
});

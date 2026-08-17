import { test, expect } from '@playwright/test';

// Instantes UTC verificados contra America/Santiago (ver commit): lunes 14:00,
// lunes 16:01 y sábado 10:00 hora de Chile — evita adivinar el offset de DST.
const MONDAY_BEFORE_CUTOFF = '2026-08-17T18:00:00Z'; // lunes 14:00
const MONDAY_AFTER_CUTOFF = '2026-08-17T20:01:00Z'; // lunes 16:01
const SATURDAY_MORNING = '2026-08-22T14:00:00Z'; // sábado 10:00

function withNow(page: import('@playwright/test').Page, iso: string) {
  return page.route('**/carta', route =>
    route.continue({ headers: { ...route.request().headers(), 'x-e2e-now': iso } })
  );
}

test.describe('Visibilidad de MENÚ SEMANAL según día/hora (Chile)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('dimoe_lead_carta_submitted', '1'));
  });

  test('lunes antes de las 16:00 muestra el tab MENÚ SEMANAL', async ({ page }) => {
    await withNow(page, MONDAY_BEFORE_CUTOFF);
    await page.goto('/carta');
    await expect(page.locator('[data-tab="SEMANAL"]')).toBeVisible();
  });

  test('lunes a las 16:01 oculta el tab MENÚ SEMANAL', async ({ page }) => {
    await withNow(page, MONDAY_AFTER_CUTOFF);
    await page.goto('/carta');
    await expect(page.locator('[data-tab="SEMANAL"]')).toHaveCount(0);
  });

  test('sábado oculta el tab MENÚ SEMANAL incluso temprano', async ({ page }) => {
    await withNow(page, SATURDAY_MORNING);
    await page.goto('/carta');
    await expect(page.locator('[data-tab="SEMANAL"]')).toHaveCount(0);
  });

  test('deep-link a #semanal no activa el tab cuando está oculto', async ({ page }) => {
    await withNow(page, SATURDAY_MORNING);
    await page.goto('/carta#semanal');
    await expect(page.getByRole('heading', { name: 'MENÚ SEMANAL' })).not.toBeVisible();
  });
});

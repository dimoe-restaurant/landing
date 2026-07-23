import { test, expect } from '@playwright/test';

const TITLE = /¿Primera vez en DiMOE\?/i;
const COOKIE_TEXT = /Usamos cookies/i;

test.describe('LeadBanner — captura de leads en /carta', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('/api/lead-carta', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
    );
  });

  test('espera a que se resuelva el cookie banner y nunca se muestra junto a él', async ({ page }) => {
    await page.goto('/carta');
    await expect(page.getByText(COOKIE_TEXT)).toBeVisible();
    await expect(page.getByText(TITLE)).not.toBeVisible();

    await page.getByRole('button', { name: /Aceptar todo/i }).click();
    await expect(page.getByText(COOKIE_TEXT)).not.toBeVisible();
    await expect(page.getByText(TITLE)).toBeVisible();
  });

  test.describe('con consentimiento de cookies ya resuelto', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem('dimoe_cookie_consent', 'all'));
      await page.goto('/carta');
      await expect(page.getByText(TITLE)).toBeVisible();
    });

    test('renderiza todos los campos', async ({ page }) => {
      await expect(page.getByPlaceholder('Tu nombre')).toBeVisible();
      await expect(page.getByPlaceholder('DD/MM/AAAA')).toBeVisible();
      await expect(page.getByPlaceholder('tu@email.com')).toBeVisible();
      await expect(page.getByPlaceholder('+56 9...')).toBeVisible();
      await expect(page.getByText(/acepto recibir comunicaciones/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /guardar mis datos/i })).toBeVisible();
    });

    test('muestra errores al enviar vacío', async ({ page }) => {
      await page.getByRole('button', { name: /guardar mis datos/i }).click();
      await expect(page.getByText(/nombre es obligatorio/i)).toBeVisible();
      await expect(page.getByText(/email es obligatorio/i)).toBeVisible();
      await expect(page.getByText(/teléfono es obligatorio/i)).toBeVisible();
      await expect(page.getByText(/fecha inválida/i)).toBeVisible();
    });

    test('muestra error con email inválido', async ({ page }) => {
      await page.getByPlaceholder('Tu nombre').fill('Juan');
      await page.getByPlaceholder('DD/MM/AAAA').fill('01011990');
      await page.getByPlaceholder('tu@email.com').fill('no-es-email');
      await page.getByPlaceholder('+56 9...').fill('+56912345678');
      await page.getByRole('button', { name: /guardar mis datos/i }).click();
      await expect(page.getByText(/email inválido/i)).toBeVisible();
    });

    test('la fecha de nacimiento se autoformatea al tipear', async ({ page }) => {
      const dob = page.getByPlaceholder('DD/MM/AAAA');
      await dob.fill('01011990');
      await expect(dob).toHaveValue('01/01/1990');
    });

    test('checkbox de marketing es interactivo', async ({ page }) => {
      const checkbox = page.locator('input[type="checkbox"]');
      await expect(checkbox).not.toBeChecked();
      await checkbox.click();
      await expect(checkbox).toBeChecked();
    });

    test('happy path: envío exitoso oculta el banner y no vuelve a aparecer', async ({ page }) => {
      await page.getByPlaceholder('Tu nombre').fill('Juan Pérez');
      await page.getByPlaceholder('DD/MM/AAAA').fill('01011990');
      await page.getByPlaceholder('tu@email.com').fill('juan@test.com');
      await page.getByPlaceholder('+56 9...').fill('+56912345678');
      await page.getByRole('button', { name: /guardar mis datos/i }).click();
      await expect(page.getByText(/¡Listo!/i)).toBeVisible();

      const submittedFlag = await page.evaluate(() => localStorage.getItem('dimoe_lead_carta_submitted'));
      expect(submittedFlag).toBe('1');

      await page.reload();
      await expect(page.getByText(TITLE)).not.toBeVisible();
    });

    test('cerrar con X oculta el banner y no reaparece tras recargar (cooldown 24h)', async ({ page }) => {
      await page.locator('button[aria-label="Cerrar"]').click();
      await expect(page.getByText(TITLE)).not.toBeVisible();

      const dismissedUntil = await page.evaluate(() => localStorage.getItem('dimoe_lead_carta_dismissed_until'));
      expect(Number(dismissedUntil)).toBeGreaterThan(Date.now());

      await page.reload();
      await expect(page.getByText(TITLE)).not.toBeVisible();
    });
  });
});

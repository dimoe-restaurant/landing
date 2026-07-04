import { test, expect } from '@playwright/test';

test.describe('Secciones principales', () => {
  test('hero muestra headline, subtítulo y CTA a WhatsApp', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText(/auténtica pizza/i);
    await expect(page.getByText(/35 minutos de Santiago/i)).toBeVisible();
    const cta = page.locator('#inicio').getByRole('link', { name: /reservar mesa/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /wa\.me\/56973694101/);
  });

  test('todas las secciones están en el DOM', async ({ page }) => {
    await page.goto('/');
    for (const id of ['inicio', 'nosotros', 'menu', 'resenas', 'contacto']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('navbar desktop tiene todos los links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /nosotros/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /carta/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /reseñas/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /contacto/i }).first()).toBeVisible();
    const reservar = page.getByRole('link', { name: /^reservar$/i }).first();
    await expect(reservar).toHaveAttribute('href', /wa\.me/);
  });

  test('botón flotante de WhatsApp está visible y tiene número correcto', async ({ page }) => {
    await page.goto('/');
    const float = page.locator('a[href*="wa.me/56973694101"]').last();
    await expect(float).toBeVisible();
  });

  test('sección reseñas muestra badge de premio y rating', async ({ page }) => {
    await page.goto('/');
    await page.locator('#resenas').scrollIntoViewIfNeeded();
    await expect(page.getByText(/2° lugar Top Chile 2025/i)).toBeVisible();
    await expect(page.getByText(/Google Business/i)).toBeVisible();
  });

  test('sección contacto tiene WhatsApp y link a Google Maps', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contacto').scrollIntoViewIfNeeded();
    const wa = page.locator('#contacto').getByRole('link', { name: /reservar por whatsapp/i });
    await expect(wa).toBeVisible();
    await expect(wa).toHaveAttribute('href', /wa\.me/);
    const maps = page.getByRole('link', { name: /Google Maps/i }).first();
    await expect(maps).toHaveAttribute('href', /google\.com\/maps|maps\.app\.goo\.gl/);
  });
});

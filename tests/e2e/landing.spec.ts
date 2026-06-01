import { test, expect } from '@playwright/test';

test('renderiza el hero con headline y CTA principal', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /auténtica pizza/i })).toBeVisible();
  const cta = page.getByRole('link', { name: /reservar mesa/i });
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute('href', /wa\.me/);
});

test('navbar tiene link de reserva con destino WhatsApp', async ({ page }) => {
  await page.goto('/');
  const reservar = page.getByRole('link', { name: /^reservar$/i }).first();
  await expect(reservar).toBeVisible();
  await expect(reservar).toHaveAttribute('href', /wa\.me/);
});

test('todas las secciones principales están presentes', async ({ page }) => {
  await page.goto('/');
  for (const id of ['nosotros', 'menu', 'resenas', 'contacto']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});

test('sección de reseñas muestra el award badge', async ({ page }) => {
  await page.goto('/');
  await page.locator('#resenas').scrollIntoViewIfNeeded();
  await expect(page.getByText(/2° lugar Top Chile 2025/i)).toBeVisible();
});

test('sección de contacto tiene botón de WhatsApp', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  const wa = page.getByRole('link', { name: /reservar por whatsapp/i });
  await expect(wa).toBeVisible();
  await expect(wa).toHaveAttribute('href', /wa\.me/);
});

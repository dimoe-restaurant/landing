import { test, expect } from '@playwright/test';

test.describe('Cookie banner y consent', () => {
  test('aparece en primera visita (sin consent previo)', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/usamos cookies/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /aceptar todo/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /solo esenciales/i })).toBeVisible();
  });

  test('"Aceptar todo" oculta el banner', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /aceptar todo/i }).click();
    await expect(page.getByText(/usamos cookies/i)).not.toBeVisible();
  });

  test('"Solo esenciales" oculta el banner', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /solo esenciales/i }).click();
    await expect(page.getByText(/usamos cookies/i)).not.toBeVisible();
  });

  test('banner no aparece tras aceptar y recargar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /aceptar todo/i }).click();
    await page.reload();
    await expect(page.getByText(/usamos cookies/i)).not.toBeVisible();
  });

  test('"Gestionar cookies" en footer resetea consent y muestra banner', async ({ page }) => {
    // Aceptar primero para que no aparezca el banner
    await page.goto('/');
    await page.getByRole('button', { name: /aceptar todo/i }).click();
    // Hacer click en "Gestionar cookies" del footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByRole('button', { name: /gestionar cookies/i }).click();
    // Recarga → banner debe aparecer
    await expect(page.getByText(/usamos cookies/i)).toBeVisible();
  });
});

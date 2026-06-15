import { test, expect } from '@playwright/test';

// El lightbox tiene aria-modal="true", el cookie banner no → locator único
const LIGHTBOX = '[role="dialog"][aria-modal="true"]';

async function openLightbox(page: Parameters<Parameters<typeof test>[1]>[0]) {
  const btn = page.locator('button[aria-label^="Ver foto:"]').first();
  await btn.scrollIntoViewIfNeeded();
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(page.locator(LIGHTBOX)).toBeVisible();
}

test.describe('Galería de fotos y lightbox', () => {
  test('galería muestra 6 fotos en el grid', async ({ page }) => {
    await page.goto('/');
    const first = page.locator('button[aria-label^="Ver foto:"]').first();
    await first.scrollIntoViewIfNeeded();
    await expect(page.locator('button[aria-label^="Ver foto:"]')).toHaveCount(6);
  });

  test('click en foto abre el lightbox', async ({ page }) => {
    await page.goto('/');
    await openLightbox(page);
    await expect(page.getByRole('button', { name: /cerrar/i })).toBeVisible();
  });

  test('lightbox cierra al click en el botón ×', async ({ page }) => {
    await page.goto('/');
    await openLightbox(page);
    await page.getByRole('button', { name: /cerrar/i }).click();
    await expect(page.locator(LIGHTBOX)).not.toBeVisible();
  });

  test('lightbox cierra con tecla Escape', async ({ page }) => {
    await page.goto('/');
    await openLightbox(page);
    await page.keyboard.press('Escape');
    await expect(page.locator(LIGHTBOX)).not.toBeVisible();
  });

  test('navegación prev/next con botones y flechas de teclado', async ({ page }) => {
    await page.goto('/');
    await openLightbox(page);

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await page.getByRole('button', { name: /foto siguiente/i }).click();
    await page.getByRole('button', { name: /foto anterior/i }).click();

    await expect(page.locator(LIGHTBOX)).toBeVisible();
  });
});

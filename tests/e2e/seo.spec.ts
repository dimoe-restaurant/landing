import { test, expect } from '@playwright/test';

test.describe('SEO y meta tags', () => {
  test('página tiene title y meta description', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/DiMOE/i);
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /.{20,}/); // al menos 20 chars
  });

  test('OG tags presentes para compartir en redes', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', /.+/);
  });

  test('links de WhatsApp apuntan al número correcto (+56973694101)', async ({ page }) => {
    await page.goto('/');
    const waLinks = page.locator('a[href*="wa.me"]');
    const count = await waLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(waLinks.nth(i)).toHaveAttribute('href', /56973694101/);
    }
  });

  test('links externos (http/https) tienen rel="noopener noreferrer"', async ({ page }) => {
    await page.goto('/');
    // Solo links que apuntan a dominios externos (href empieza con http)
    const externalLinks = page.locator('a[target="_blank"][href^="http"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(externalLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });

  test('/privacidad carga y tiene contenido', async ({ page }) => {
    await page.goto('/privacidad');
    await expect(page.getByText(/política de privacidad/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /volver/i }).first()).toBeVisible();
  });
});

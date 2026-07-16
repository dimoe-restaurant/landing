import { test, expect } from '@playwright/test';

test.describe('Carta digital (/carta)', () => {
  test('home de la carta muestra el selector de secciones, sin productos', async ({ page }) => {
    await page.goto('/carta');
    await expect(page.getByRole('heading', { name: /para todos los gustos/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /ANTIPASTI/ }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ANTIPASTI' })).not.toBeVisible();
  });

  test('elegir una sección muestra sus productos y el ícono home vuelve al selector', async ({ page }) => {
    await page.goto('/carta');
    await page.getByRole('button', { name: /PIZZAS/ }).first().click();
    await expect(page.getByRole('heading', { name: 'PIZZAS' })).toBeVisible();

    await page.getByRole('button', { name: /inicio de la carta/i }).click();
    await expect(page.getByRole('heading', { name: /para todos los gustos/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'PIZZAS' })).not.toBeVisible();
  });

  test('/carta no muestra el navbar ni el whatsapp flotante del sitio', async ({ page }) => {
    await page.goto('/carta');
    await expect(page.getByRole('link', { name: /reservar por whatsapp/i })).toHaveCount(0);
    await expect(page.locator('a[href^="mailto:contacto@dimoe.cl"]')).toBeVisible();
  });

  test('deep-link con hash entra directo a la sección, y volver al home preserva la query string', async ({ page }) => {
    await page.goto('/carta?utm_source=qr#pizzas');
    await expect(page.getByRole('heading', { name: 'PIZZAS' })).toBeVisible();

    await page.getByRole('button', { name: /inicio de la carta/i }).click();
    await expect(page).toHaveURL(/\/carta\?utm_source=qr$/);
  });
});

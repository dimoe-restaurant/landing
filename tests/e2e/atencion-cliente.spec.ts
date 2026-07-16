import { test, expect } from '@playwright/test';

test.describe('Página de Atención al Cliente', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('/api/contact', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
    );
    await page.goto('/atencion-cliente');
  });

  test('muestra el gate de experiencia con las 2 opciones', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /cómo estuvo tu visita a dimoe/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /fue una experiencia excelente/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /hay algo que quiero contarles/i })).toBeVisible();
  });

  test('camino feliz: muestra CTA a reseña de Google, sin mostrar el formulario', async ({ page }) => {
    await page.getByRole('button', { name: /fue una experiencia excelente/i }).click();
    const reviewLink = page.getByRole('link', { name: /dejar reseña en google/i });
    await expect(reviewLink).toBeVisible();
    await expect(reviewLink).toHaveAttribute('target', '_blank');
    await expect(reviewLink).toHaveAttribute('href', /google|maps/i);
    await expect(page.getByPlaceholder(/tu nombre/i)).not.toBeVisible();
  });

  test('camino "hay algo que contarles": despliega el formulario con selector de Tipo', async ({ page }) => {
    await page.getByRole('button', { name: /hay algo que quiero contarles/i }).click();
    await expect(page.getByRole('button', { name: /^reclamo$/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^sugerencia$/i })).toBeVisible();
    await expect(page.getByPlaceholder(/tu nombre/i)).toBeVisible();
  });

  test('reclamo: requiere seleccionar un tipo antes de enviar', async ({ page }) => {
    await page.getByRole('button', { name: /hay algo que quiero contarles/i }).click();
    await page.getByPlaceholder(/tu nombre/i).fill('Juan Pérez');
    await page.getByPlaceholder(/tu@email\.com/i).fill('juan@test.com');
    await page.getByPlaceholder(/en qué te podemos ayudar/i).fill('La pizza llegó fría.');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/selecciona una opción/i)).toBeVisible();
  });

  test('reclamo: envío exitoso muestra copy de revisión del equipo', async ({ page }) => {
    await page.getByRole('button', { name: /hay algo que quiero contarles/i }).click();
    await page.getByRole('button', { name: /^reclamo$/i }).click();
    await page.getByPlaceholder(/tu nombre/i).fill('Juan Pérez');
    await page.getByPlaceholder(/tu@email\.com/i).fill('juan@test.com');
    await page.getByPlaceholder(/en qué te podemos ayudar/i).fill('La pizza llegó fría.');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/recibimos tu mensaje/i)).toBeVisible();
    await expect(page.getByText(/24-48 horas/i)).toBeVisible();
  });
});

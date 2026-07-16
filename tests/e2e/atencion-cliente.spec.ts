import { test, expect } from '@playwright/test';

test.describe('Página de Atención al Cliente', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('/api/contact', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
    );
    await page.goto('/atencion-cliente');
  });

  test('carga directo al formulario, sin ningún gate previo', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /cuéntanos qué pasó/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^reclamo$/i })).toBeVisible();
    await expect(page.getByPlaceholder(/tu nombre/i)).toBeVisible();
  });

  test('requiere seleccionar un Tipo antes de enviar', async ({ page }) => {
    await page.getByPlaceholder(/tu nombre/i).fill('Juan Pérez');
    await page.getByPlaceholder(/tu@email\.com/i).fill('juan@test.com');
    await page.getByPlaceholder(/en qué te podemos ayudar/i).fill('La pizza llegó fría.');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/selecciona una opción/i)).toBeVisible();
  });

  test('Felicitación: abre Google Maps y oculta el resto del formulario', async ({ page, context }) => {
    const popupPromise = context.waitForEvent('page');
    await page.getByRole('button', { name: /^felicitación$/i }).click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(/google|maps/i);

    await expect(page.getByPlaceholder(/tu nombre/i)).not.toBeVisible();
    const reviewLink = page.getByRole('link', { name: /dejar reseña en google/i });
    await expect(reviewLink).toBeVisible();
    await expect(reviewLink).toHaveAttribute('target', '_blank');
  });

  test('Reclamo: muestra el formulario completo y el envío exitoso avisa que el equipo lo revisa', async ({ page }) => {
    await page.getByRole('button', { name: /^reclamo$/i }).click();
    await expect(page.getByPlaceholder(/tu nombre/i)).toBeVisible();
    await page.getByPlaceholder(/tu nombre/i).fill('Juan Pérez');
    await page.getByPlaceholder(/tu@email\.com/i).fill('juan@test.com');
    await page.getByPlaceholder(/en qué te podemos ayudar/i).fill('La pizza llegó fría.');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/recibimos tu mensaje/i)).toBeVisible();
    await expect(page.getByText(/24-48 horas/i)).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Formulario de contacto', () => {
  test.beforeEach(async ({ page }) => {
    // Mockear API para no mandar emails reales
    await page.route('/api/contact', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
    );
    await page.goto('/');
    await page.locator('#contacto').scrollIntoViewIfNeeded();
  });

  test('renderiza todos los campos', async ({ page }) => {
    await expect(page.getByPlaceholder(/tu nombre/i)).toBeVisible();
    await expect(page.getByPlaceholder(/tu@email\.com/i)).toBeVisible();
    await expect(page.getByPlaceholder(/teléfono/i)).toBeVisible();
    await expect(page.getByPlaceholder(/en qué te podemos ayudar/i)).toBeVisible();
    await expect(page.getByText(/acepto recibir comunicaciones/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /enviar mensaje/i })).toBeVisible();
  });

  test('muestra errores al enviar vacío', async ({ page }) => {
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/nombre es obligatorio/i)).toBeVisible();
    await expect(page.getByText(/email es obligatorio/i)).toBeVisible();
    await expect(page.getByText(/mensaje es obligatorio/i)).toBeVisible();
  });

  test('muestra error con email inválido', async ({ page }) => {
    await page.getByPlaceholder(/tu nombre/i).fill('Juan');
    await page.getByPlaceholder(/tu@email\.com/i).fill('no-es-email');
    await page.getByPlaceholder(/en qué te podemos ayudar/i).fill('Consulta');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/email inválido/i)).toBeVisible();
  });

  test('muestra error con teléfono inválido', async ({ page }) => {
    await page.getByPlaceholder(/tu nombre/i).fill('Juan');
    await page.getByPlaceholder(/tu@email\.com/i).fill('juan@test.com');
    await page.getByPlaceholder(/teléfono/i).fill('abc');
    await page.getByPlaceholder(/en qué te podemos ayudar/i).fill('Consulta');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/formato inválido/i)).toBeVisible();
  });

  test('happy path: envío exitoso muestra estado de éxito', async ({ page }) => {
    await page.getByPlaceholder(/tu nombre/i).fill('Juan Pérez');
    await page.getByPlaceholder(/tu@email\.com/i).fill('juan@test.com');
    await page.getByPlaceholder(/teléfono/i).fill('+56912345678');
    await page.getByPlaceholder(/en qué te podemos ayudar/i).fill('Quiero reservar para 4 personas el viernes.');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/mensaje enviado/i)).toBeVisible();
    await expect(page.getByText(/te responderemos/i)).toBeVisible();
  });

  test('teléfono es opcional — envío sin él funciona', async ({ page }) => {
    await page.getByPlaceholder(/tu nombre/i).fill('Ana');
    await page.getByPlaceholder(/tu@email\.com/i).fill('ana@test.com');
    await page.getByPlaceholder(/en qué te podemos ayudar/i).fill('Consulta sin teléfono.');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/mensaje enviado/i)).toBeVisible();
  });

  test('checkbox de marketing es interactivo', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]');
    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
  });
});

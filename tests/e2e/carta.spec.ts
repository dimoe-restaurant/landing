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

test.describe('Subtabs de BAR y VINOS (/carta)', () => {
  // VINOS siempre usa FALLBACK_MENU (page.tsx fuerza esto aunque Notion esté configurado),
  // así que sus 3 subtabs (Blancos, Tintos, Ensamblajes y Dulce) son deterministas.
  test('VINOS: click en "Tintos" muestra solo los tintos y oculta los blancos', async ({ page }) => {
    await page.goto('/carta#vinos');
    await expect(page.getByRole('heading', { name: 'VINOS' })).toBeVisible();

    await expect(page.getByRole('tab', { name: 'Sauvignon Blanc' })).toHaveCount(0); // no es subtab, es grupo
    await page.getByRole('tab', { name: 'Tintos' }).click();

    await expect(page.getByRole('heading', { name: 'Carménère' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cabernet Sauvignon' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Merlot' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sauvignon Blanc' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Chardonnay' })).not.toBeVisible();
  });

  test('VINOS: subtab "Todos" muestra todos los grupos', async ({ page }) => {
    await page.goto('/carta#vinos');
    await page.getByRole('tab', { name: 'Tintos' }).click();
    await expect(page.getByRole('heading', { name: 'Sauvignon Blanc' })).not.toBeVisible();

    await page.getByRole('tab', { name: 'Todos' }).click();
    await expect(page.getByRole('heading', { name: 'Sauvignon Blanc' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Carménère' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dulce' })).toBeVisible();
  });

  test('cambiar de tab principal resetea el subtab activo a "Todos"', async ({ page }) => {
    await page.goto('/carta#vinos');
    await page.getByRole('tab', { name: 'Tintos' }).click();
    await expect(page.getByRole('tab', { name: 'Tintos' })).toHaveAttribute('aria-selected', 'true');

    await page.getByRole('button', { name: /^BAR$/ }).click();
    await page.getByRole('button', { name: /^VINOS$/ }).click();

    await expect(page.getByRole('tab', { name: 'Todos' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('heading', { name: 'Sauvignon Blanc' })).toBeVisible();
  });

  // BAR puede venir de Notion (contenido variable) — se valida el comportamiento de
  // filtrado, no un bucket ni conteo de grupos específico, para no depender del
  // contenido real cargado en cada corrida.
  test('BAR: click en un subtab distinto de "Todos" filtra el contenido mostrado', async ({ page }) => {
    await page.goto('/carta#bar');
    await expect(page.getByRole('heading', { name: 'BAR' })).toBeVisible();

    const tabNames = await page.getByRole('tab').allTextContents();
    expect(tabNames).toContain('Todos');
    const otherTabs = tabNames.filter(name => name !== 'Todos');
    expect(otherTabs.length).toBeGreaterThan(0);

    const contentBefore = await page.locator('body').innerText();
    await page.getByRole('tab', { name: otherTabs[0], exact: true }).click();
    await expect(page.getByRole('tab', { name: otherTabs[0], exact: true })).toHaveAttribute('aria-selected', 'true');

    await expect(async () => {
      const contentAfter = await page.locator('body').innerText();
      expect(contentAfter).not.toEqual(contentBefore);
    }).toPass({ timeout: 2000 });
  });
});

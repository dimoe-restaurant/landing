import { test, expect } from '@playwright/test';

test.describe('Carta digital (/carta)', () => {
  test('home de la carta muestra el selector de secciones, sin productos', async ({ page }) => {
    await page.goto('/carta');
    await expect(page.getByRole('heading', { name: /para todos los gustos/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /ENTRADAS/ }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ENTRADAS' })).not.toBeVisible();
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
  // así que sus 5 subtabs (Espumante, Carménère, Cabernet Sauvignon, Merlot, Blanco) —
  // uno por Subcategoría real, sin agrupar — son deterministas (ver #237).
  test('VINOS: click en "Carménère" muestra solo ese varietal y oculta los demás', async ({ page }) => {
    await page.goto('/carta#vinos');
    await expect(page.getByRole('heading', { name: 'VINOS' })).toBeVisible();

    await page.getByRole('tab', { name: 'Carménère' }).click();

    await expect(page.getByRole('heading', { name: 'Carménère' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cabernet Sauvignon' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Merlot' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Espumante' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Blanco' })).not.toBeVisible();
  });

  test('VINOS: subtab "Todos" muestra todos los grupos', async ({ page }) => {
    await page.goto('/carta#vinos');
    await page.getByRole('tab', { name: 'Carménère' }).click();
    await expect(page.getByRole('heading', { name: 'Espumante' })).not.toBeVisible();

    await page.getByRole('tab', { name: 'Todos' }).click();
    await expect(page.getByRole('heading', { name: 'Espumante' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Carménère' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cabernet Sauvignon' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Merlot' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Blanco' })).toBeVisible();
  });

  test('cambiar de tab principal resetea el subtab activo a "Todos"', async ({ page }) => {
    await page.goto('/carta#vinos');
    await page.getByRole('tab', { name: 'Carménère' }).click();
    await expect(page.getByRole('tab', { name: 'Carménère' })).toHaveAttribute('aria-selected', 'true');

    await page.getByRole('button', { name: /^BAR$/ }).click();
    await page.getByRole('button', { name: /^VINOS$/ }).click();

    await expect(page.getByRole('tab', { name: 'Todos' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('heading', { name: 'Espumante' })).toBeVisible();
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

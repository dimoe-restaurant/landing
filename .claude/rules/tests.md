---
type: rule
name: tests
description: Qué probar y qué gate bloquea un PR
tags: [testing]
---

# Tests

## Nombres descriptivos

- `test('rejects submission when email missing', ...)` > `test('test 1', ...)`.
- Docstrings/descripciones en español, nombres de funciones/tests en inglés.

## Independencia

- Cada test debe ser independiente — sin estado mutable compartido entre tests.
- Fixtures se re-crean por test.
- Evitar mocks globales que persistan entre tests.

## Real > mock

- Preferir implementaciones reales sobre mocks.
- Mock solo servicios externos (APIs de terceros, pasarelas de pago, Turnstile, servicios de email).
- Usar MSW (mock service worker) para mockear fetch/axios en frontend.

## Qué cubrir por feature/fix

1. **Happy path** — el caso de uso principal funciona.
2. **Validación de input** — inputs inválidos/vacíos/límite se rechazan con el error esperado, no con un crash.
3. **Errores de autorización** — si hay auth/permisos, un caso sin permiso recibe el error correcto.
4. **Edge cases** — bordes del dominio.

## Gate único que bloquea el PR: Playwright

Decisión del workspace: en este repo (frontend web, Next.js) **el gate
es Playwright**. No se usan Vitest/Jest unitarios como gate — el dev
puede correrlos a mano si quiere, pero ningún skill los invoca como
bloqueante. Razón: Playwright cubre el flujo real del usuario en
navegador, lo que importa para una landing pública. Los unitarios siguen
siendo útiles pero no bloquean el commit.

### Convenciones obligatorias

- **Script en `package.json`:** debe llamarse `test:e2e` (no `dev`, no `start`).
  ```json
  { "scripts": { "test:e2e": "playwright test --reporter=line" } }
  ```
- **Puerto del webServer: `39847`** (rango efímero alto, fuera de los típicos 3000/5173/8080/4200/8000). Configurable con `PLAYWRIGHT_E2E_PORT`.
- **`webServer` en `playwright.config.ts`** — el runner levanta y baja el server local:
  ```ts
  import { defineConfig } from '@playwright/test';
  const PORT = Number(process.env.PLAYWRIGHT_E2E_PORT ?? 39847);

  export default defineConfig({
    testDir: 'tests/e2e',
    timeout: 30_000,
    reporter: 'line',
    use: { baseURL: `http://localhost:${PORT}`, headless: true },
    webServer: {
      command: `pnpm run dev -- --port ${PORT}`,
      port: PORT,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  });
  ```
- **Carpeta `tests/e2e/`** al nivel del repo (no dentro de `app/`). El bundler de producción no la incluye. Está bajo Git pero no bajo el build.
- **Headless siempre.** Nunca `--headed` en el gate. El dev puede usar `--ui`/`--headed` a mano para debug.
- **Mocks > datos reales.** Si la UI llama a la API y se puede mockear con MSW, hacerlo. No pedir credenciales reales al dev.

### Spec mínimo para tasks de UI

```ts
// tests/e2e/<componente>.spec.ts
import { test, expect } from '@playwright/test';

test('<Componente> renderiza y responde a la interacción primaria', async ({ page }) => {
  await page.goto('/ruta-del-componente');
  await expect(page.getByRole('heading', { name: /título esperado/i })).toBeVisible();
  await page.getByRole('button', { name: /acción primaria/i }).click();
  await expect(page.getByText(/feedback esperado/i)).toBeVisible();
});

test('<Componente> muestra error en input inválido', async ({ page }) => {
  await page.goto('/ruta-del-componente');
  await page.getByLabel(/email/i).fill('no-es-email');
  await page.getByRole('button', { name: /enviar/i }).click();
  await expect(page.getByText(/email inválido/i)).toBeVisible();
});
```

Patrón: **happy path + un caso de error/validación.**

## Qué evitar

- Mockear la capa que se supone estás probando (ej. mockear el propio endpoint que testeas de punta a punta).
- Tests que dependen de orden de ejecución o estado compartido entre ellos.
- `Model.objects.all().delete()`-style cleanup — usar fixtures scoped, no borrar todo.
- Tests vacíos sin asserts, o que siempre pasan.
- Escribir un test nuevo sin antes correrlo contra el código roto para confirmar que **falla**, luego arreglar y confirmar que **pasa**.

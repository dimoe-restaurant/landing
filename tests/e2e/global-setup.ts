import type { FullConfig } from '@playwright/test';
import { E2E_PUBLISH_SECRET } from './e2e-constants';

// next dev compila cada ruta on-demand en la primera request — con 2 workers en
// paralelo, dos rutas frías compilando a la vez pueden superar el timeout de un test.
// Precompilar acá, antes de que arranquen los workers, evita esa carrera de arranque.
const ROUTES_TO_WARM = [
  '/',
  '/carta',
  '/atencion-cliente',
  '/nosotros',
  '/resenas',
  '/privacidad',
  `/api/preview?secret=${E2E_PUBLISH_SECRET}`,
  '/api/preview-exit',
];

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL ?? 'http://localhost:39847';

  for (const route of ROUTES_TO_WARM) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(`${baseURL}${route}`, { signal: AbortSignal.timeout(60_000) });
        if (res.ok) break;
      } catch {
        if (attempt === 3) throw new Error(`No se pudo precompilar ${route} tras 3 intentos`);
      }
    }
  }
}

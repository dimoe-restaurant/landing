// Secret de PUBLISH_SECRET usado solo dentro del gate E2E (playwright.config.ts lo
// setea en el proceso del servidor) — nunca es un secret real, no protege nada.
export const E2E_PUBLISH_SECRET = 'e2e-test-secret';

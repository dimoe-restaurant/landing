import { defineConfig } from '@playwright/test';

const PORT = Number(process.env.PLAYWRIGHT_E2E_PORT ?? 39847);

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  workers: 2,
  reporter: 'line',
  use: { baseURL: `http://localhost:${PORT}`, headless: true },
  webServer: {
    command: `pnpm dev -- --port ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

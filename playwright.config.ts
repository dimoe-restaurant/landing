import { defineConfig } from '@playwright/test';
import { E2E_PUBLISH_SECRET } from './tests/e2e/e2e-constants';

const PORT = Number(process.env.PLAYWRIGHT_E2E_PORT ?? 39847);

export default defineConfig({
  testDir: 'tests/e2e',
  globalSetup: './tests/e2e/global-setup.ts',
  timeout: 30_000,
  workers: 2,
  reporter: 'line',
  use: { baseURL: `http://localhost:${PORT}`, headless: true },
  webServer: {
    command: `pnpm dev --port ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      PLAYWRIGHT_E2E: 'true',
      PUBLISH_SECRET: process.env.PUBLISH_SECRET ?? E2E_PUBLISH_SECRET,
    },
  },
});

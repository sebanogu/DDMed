import { defineConfig, devices } from '@playwright/test';

const frontendPort = Number(process.env.PLAYWRIGHT_FRONTEND_PORT || 4200);
const backendPort = Number(process.env.PLAYWRIGHT_BACKEND_PORT || 3000);
const useStaticFrontendInCi = Boolean(process.env.CI);
const frontendCommand = useStaticFrontendInCi
  ? `npm run build:test && node scripts/serve-dist.mjs dist ${frontendPort}`
  : `npx ng serve --host 127.0.0.1 --port ${frontendPort}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${frontendPort}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: [
    {
      command: `node src/index.js`,
      cwd: '../backend',
      port: backendPort,
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      stderr: 'pipe',
      env: {
        ...process.env,
        PORT: String(backendPort),
        DB_HOST: process.env.DB_HOST || '127.0.0.1',
        DB_PORT: process.env.DB_PORT || '5432',
        DB_NAME: process.env.DB_NAME || 'hapi',
        DB_USER: process.env.DB_USER || 'admin',
        DB_PASSWORD: process.env.DB_PASSWORD || 'admin',
        SEED_DEMO_AUTH: 'true',
      },
    },
    {
      command: frontendCommand,
      cwd: '.',
      port: frontendPort,
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

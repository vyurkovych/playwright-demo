import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  reporter: [
      ['html', { open: 'never' }],
      ['list']
  ],
  use: {
    baseURL: 'https://www.douglas.de/de',
    headless: true,
    launchOptions: {
      slowMo: 200,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

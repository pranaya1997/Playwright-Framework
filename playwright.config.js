const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,
  workers: 1,
  reporter: [
    ['line'], // For Console Formating
    ['html', { outputFolder: 'reports/playwright-report' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['allure-playwright']
  ],
  use: {
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    headless: true,
    launchOptions: {
      slowMo: 500
    }
  },
  projects: [

    // ✅ UI - Chromium
    {
      name: 'chromium',
      testDir: './src/test/tests',
      use: { ...devices['Desktop Chrome'] },
    },

    // ✅ UI - Firefox
    {
      name: 'firefox',
      testDir: './src/test/tests',
      use: { ...devices['Desktop Firefox'] },
    },

    // ✅ UI - WebKit
    {
      name: 'webkit',
      testDir: './src/test/tests',
      use: { ...devices['Desktop Safari'] },
    },

    // ✅ API Tests
    {
      name: 'api',
      testDir: './src/apiTests',
      testMatch: '**/*.spec.js',
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
      },
    },
  ],
});
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,
  workers: 1,
  fullyParallel: false,
  reporter: [
    ['line'],
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
    {
      name: 'chromium',
      testDir: './src/uiTests/tests',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'api',
      testDir: './src/apiTests',
      testMatch: '**/*.spec.js',
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com'
      }
    }
  ]
});
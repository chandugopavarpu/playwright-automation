const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.js/,
    use: {
      ...devices['Desktop Chrome'],
      channel: 'chrome',
    },
  },

  {
    name: 'chromium',
    testIgnore: /.*\.setup\.js/,
    use: {
      ...devices['Desktop Chrome'],
      channel: 'chrome',
      storageState: 'playwright/.auth/user.json',
    },
    dependencies: ['setup'],
  },
],
});
  



    // Commented out Firefox and WebKit to avoid download issues
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
 

// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect : {
    timeout : 5000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName : 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure'
  },
});


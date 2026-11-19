const { defineConfig } = require('@playwright/test');
const fs = require('node:fs');
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
module.exports = defineConfig({
  testDir: './tests',
  testMatch: ['browser.spec.cjs', 'navigation.spec.cjs', 'integration-004.spec.cjs', 'integration-v1.spec.cjs'],
  timeout: 45000,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4176',
    headless: true,
    launchOptions: { executablePath },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } }
  ],
  webServer: {
    command: 'python3 -m http.server 4176 --bind 127.0.0.1',
    url: 'http://127.0.0.1:4176',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'ignore'
  }
});

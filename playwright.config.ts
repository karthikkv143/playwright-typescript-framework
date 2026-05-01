import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config({
  path: process.env.ENV_NAME ? `./env-files/.env.${process.env.ENV_NAME}` : './env-files/.env.qa'
});

export default defineConfig({
  testDir: './tests/ui-tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', { open: 'never' }], ['line'],['junit', { outputFile: 'test-results/results.xml' }]],
  timeout: 90000,
  expect: {
    timeout: 500000
  },

  use: {
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on',
    actionTimeout: 100000,
    navigationTimeout: 100000,

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Setup',
      testMatch: 'global.setup.ts',
    },
    {
      name: 'chromium',
      dependencies: ['Setup'],
      use: {
        ...devices['Desktop Chrome'],
        // headless: false,
        storageState: './authentication/.auth/auth.json'
      },
    },
    {
      name: 'api_tests',
      testMatch: 'api-tests/*.spec.ts',
      testDir: './tests/api-tests',
      use: {
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        }
      }
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

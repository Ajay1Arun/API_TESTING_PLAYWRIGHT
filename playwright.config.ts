import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig ={
  timeout: 60000,
  retries :0,
  testDir: 'tests/',
  use: {
      headless: true,
      viewport: {width:1280, height:720},
      actionTimeout:10000,
      ignoreHTTPSErrors: true,
      video:'off',
      screenshot:'on',
  },
  projects:[
      {
          name: 'chromium',
          use: {browserName: 'chromium'},

  }],


}

export default config
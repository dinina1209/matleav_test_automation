// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
//import { config } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 30*1000,
  expect: {
    timeout: 9000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot : 'on',
    //trace: 'on'
    trace : 'retain-on-failure'
  },
};

module.exports = config


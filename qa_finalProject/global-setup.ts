import { chromium, FullConfig } from '@playwright/test';
require('dotenv').config();
async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', process.env.SAUCE_USER_STANDARD!);
  await page.fill('#password', process.env.SAUCE_PASSWORD!);
  await page.click('#login-button');
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;

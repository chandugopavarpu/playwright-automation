const { test: setup } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    'standard_user',
    'secret_sauce'
  );

  await page.waitForURL(/inventory/);

  await page.context().storageState({
    path: authFile
  });
});
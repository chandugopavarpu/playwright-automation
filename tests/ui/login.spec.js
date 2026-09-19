const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.use({
  storageState: {
    cookies: [],
    origins: []
  }
});

test.describe('Login functionality', () => {

  test('should login successfully with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await expect(page).toHaveURL(/inventory/);
  });


  test('should display error for invalid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      'invalid_user',
      'wrong_password'
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });

});
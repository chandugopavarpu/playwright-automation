const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');

test.describe('Product functionality', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );
  });

  test('should display products after login', async ({ page }) => {

    const productsPage = new ProductsPage(page);

    const productCount = await productsPage.getProductCount();

    expect(productCount).toBeGreaterThan(0);
  });


  test('should add a product to cart', async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart('Sauce Labs Backpack');

    await expect(productsPage.cartButton).toContainText('1');
  });


  test('should sort products by price low to high', async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await productsPage.sortProducts('lohi');

    await expect(productsPage.productSort).toHaveValue('lohi');
  });

});
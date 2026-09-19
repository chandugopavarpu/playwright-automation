const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ProductsPage');

test.describe('Product functionality', () => {

  test('should display products after login', async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await productsPage.navigate();

    const productCount = await productsPage.getProductCount();

    expect(productCount).toBeGreaterThan(0);
  });


  test('should add a product to cart', async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await productsPage.navigate();

    await productsPage.addProductToCart('Sauce Labs Backpack');

    await expect(productsPage.cartButton).toContainText('1');
  });


  test('should sort products by price low to high', async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await productsPage.navigate();

    await productsPage.sortProducts('lohi');

    await expect(productsPage.productSort).toHaveValue('lohi');
  });

});
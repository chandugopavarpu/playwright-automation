class ProductsPage {
  constructor(page) {
    this.page = page;

    this.products = page.locator('.inventory_item');
    this.cartButton = page.locator('.shopping_cart_link');
    this.productSort = page.locator('[data-test="product-sort-container"]');
    this.inventoryContainer = page.locator('.inventory_container');
  }

  async navigate() {
    await this.page.goto('/inventory.html');
  }

  async waitForProductsPage() {
    await this.inventoryContainer.waitFor({
      state: 'visible'
    });
  }

  async getProductCount() {
    await this.waitForProductsPage();

    return await this.products.count();
  }

  async addProductToCart(productName) {
    await this.waitForProductsPage();

    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await product.locator('button').click();
  }

  async openCart() {
    await this.cartButton.click();
  }

  async sortProducts(value) {
    await this.waitForProductsPage();

    await this.productSort.selectOption(value);
  }
}

module.exports = { ProductsPage };
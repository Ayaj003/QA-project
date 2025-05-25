import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addToCart(productName: string) {
    const productLocator = this.page.locator('.inventory_item').filter({
      hasText: productName
    });
    await productLocator.locator('button').click();
  }
    async addToCartByIndex(index: number) {
    const buttons = this.page.locator('[data-test^="add-to-cart"]');
    await buttons.nth(index).click();
  }

  async getCartItemCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const countText = await this.cartBadge.textContent();
      return parseInt(countText || '0');
    }
    return 0;
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }

  async selectSortOption(option: string) {
    await this.page.selectOption('.product_sort_container', option);
    // Wait for the items to update
    await this.page.waitForTimeout(500); 
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(text => parseFloat(text.replace('$', '')));
  }
}
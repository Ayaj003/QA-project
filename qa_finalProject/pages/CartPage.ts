import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeItem(productName: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: productName });
    await item.locator('button').click();
  }

  async isItemInCart(productName: string): Promise<boolean> {
    const item = this.page.locator('.cart_item').filter({ hasText: productName });
    return await item.isVisible();
  }
}

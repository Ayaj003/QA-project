import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCheckoutInfo(first: string, last: string, zip: string) {
    await this.page.fill('[data-test="firstName"]', first);
    await this.page.fill('[data-test="lastName"]', last);
    await this.page.fill('[data-test="postalCode"]', zip);
    await this.page.click('[data-test="continue"]');
  }

  async isOnCheckoutStepTwo(): Promise<boolean> {
    return this.page.url().includes('checkout-step-two');
  }

  async finishOrder() {
    await this.page.click('[data-test="finish"]');
  }

  async cancelOrder() {
    await this.page.click('[data-test="cancel"]');
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async getConfirmationMessage(): Promise<string> {
    return this.page.locator('.complete-header').innerText();
  }

  async getErrorMessage(): Promise<string> {
    return this.page.locator('[data-test="error"]').innerText();
  }

  async isFinishButtonVisible(): Promise<boolean> {
    return await this.page.locator('[data-test="finish"]').isVisible();
  }
}

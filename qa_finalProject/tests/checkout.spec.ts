import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout with Fake Data', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_USER_STANDARD!, process.env.SAUCE_PASSWORD!);

    const inventory = new InventoryPage(page);
    await inventory.addToCartByIndex(0);

    await page.goto('https://www.saucedemo.com/cart.html');
    await page.click('[data-test="checkout"]');
  });

  test('Complete checkout with random user data', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    const first = faker.person.firstName();
    const last = faker.person.lastName();
    const zip = faker.location.zipCode();

    await checkout.fillCheckoutInfo(first, last, zip);
    await checkout.finishOrder();

    const message = await checkout.getConfirmationMessage();
    expect(message).toContain('Thank you for your order!');
  });
});

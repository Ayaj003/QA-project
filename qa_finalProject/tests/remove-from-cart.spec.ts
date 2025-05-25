import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Remove from Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('Remove item from cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const product = 'Sauce Labs Bike Light';
    await inventoryPage.addToCart(product);
    await inventoryPage.openCart();
    await cartPage.removeItem(product);

    const exists = await cartPage.isItemInCart(product);
    expect(exists).toBeFalsy();
  });
});

import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Add to Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('Add a single product to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(1);
  });

  test('Add multiple products to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(2);
  });
});

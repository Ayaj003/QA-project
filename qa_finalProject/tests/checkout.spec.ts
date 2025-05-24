import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Complete checkout successfully', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('/inventory.html');

  await inventoryPage.addToCart('Sauce Labs Fleece Jacket');

  await inventoryPage.openCart();

  await page.click('#checkout');

  await checkoutPage.fillInformation('سلام', 'الملكاوي', '00970');

  await checkoutPage.finishOrder();

  const message = await checkoutPage.getConfirmationMessage();
  expect(message?.toLowerCase()).toContain('thank you');
});
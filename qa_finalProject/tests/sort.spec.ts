import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Sorting Feature', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
    inventoryPage = new InventoryPage(page);
  });

  test('Sort by Name A-Z', async () => {

    await inventoryPage.selectSortOption('Name (A to Z)');
    const names = await inventoryPage.getProductNames();
    
    // Verify sorting
    const isSorted = names.every((name, i, arr) => 
      i === 0 || name.localeCompare(arr[i-1]) >= 0);
    
    expect(isSorted, 'Products should be sorted A-Z').toBeTruthy();
  });

  test('Sort by Price High to Low', async () => {
    
    await inventoryPage.selectSortOption('Price (high to low)');
    const prices = await inventoryPage.getProductPrices();
    
    // Verify sorting
    const isSorted = prices.every((price, i, arr) => 
      i === 0 || price <= arr[i-1]);
    
    expect(isSorted, 'Products should be sorted high to low').toBeTruthy();
  });
});
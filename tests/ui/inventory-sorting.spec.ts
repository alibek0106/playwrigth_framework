import { test, expect } from '../../src/fixtures';
import { SortOption, ExpectedProducts } from '../../src/constants/InventoryData';

test.describe('Inventory Sorting', { tag: ['@ui', '@regression'] }, () => {
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.goto();
    });

    test('Sort items Name (Z to A)', async ({ inventoryPage }) => {
        await inventoryPage.sortBy(SortOption.NAME_ZA);
        await expect(inventoryPage.getFirstItem(), 'Sorting Z-A should show the last alphabetical item first').toContainText(ExpectedProducts.ZA_FIRST_ITEM);
    });

    test('Sort items Price (Low to High)', async ({ inventoryPage }) => {
        await inventoryPage.sortBy(SortOption.PRICE_LOW_HIGH);
        const firstItem = inventoryPage.getFirstItem();
        await expect(firstItem, 'Sorting Low to High should show the lowest price item first').toContainText(ExpectedProducts.LOHI_FIRST_ITEM);
        await expect(firstItem, `First item price should be ${ExpectedProducts.LOHI_FIRST_PRICE}`).toContainText(ExpectedProducts.LOHI_FIRST_PRICE);
    });

    test('Sort items Price (High to Low)', async ({ inventoryPage }) => {
        await inventoryPage.sortBy(SortOption.PRICE_HIGH_LOW);
        const firstItem = inventoryPage.getFirstItem();
        await expect(firstItem, 'Sorting High-Low should show the most expensive item first').toContainText(ExpectedProducts.HILO_FIRST_ITEM);
        await expect(firstItem, `First item price should be ${ExpectedProducts.HILO_FIRST_PRICE}`).toContainText(ExpectedProducts.HILO_FIRST_PRICE);
    });
});
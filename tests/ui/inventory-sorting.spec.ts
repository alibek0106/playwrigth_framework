import { test, expect } from '../../src/fixtures';

test.describe('Inventory Sorting', { tag: ['@ui', '@regression'] }, () => {
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.goto();
    });

    test('Sort items Name (Z to A)', async ({ inventoryPage }) => {
        await inventoryPage.sortDropdown.selectOption('za');
        await expect(inventoryPage.inventoryItems.first(), 'First item is not as expected').toContainText('Test.allTheThings() T-Shirt (Red)');
    });

    test('Sort items Price (Low to High)', async ({ inventoryPage }) => {
        await inventoryPage.sortDropdown.selectOption('lohi');
        await expect(inventoryPage.inventoryItems.first(), 'First item is not as expected').toContainText('Sauce Labs Onesie');
        await expect(inventoryPage.inventoryItems.first(), 'First item price is not as expected').toContainText('$7.99');
    });

    test('Sort items Price (High to Low)', async ({ inventoryPage }) => {
        await inventoryPage.sortDropdown.selectOption('hilo');
        await expect(inventoryPage.inventoryItems.first(), 'First item is not as expected').toContainText('Sauce Labs Fleece Jacket');
        await expect(inventoryPage.inventoryItems.first(), 'First item price is not as expected').toContainText('$49.99');
    });
});
import { test, expect } from '../../src/fixtures';

test.describe('Shopping Cart Flow', () => {
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.goto();
    })
    test('Add single item to cart ubdated badge', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');

        const count = await inventoryPage.getCartCount();
        expect(count, 'Card badge count is not as expected').toBe(1);
    });

    test('Add multiple items to cart', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');

        const count = await inventoryPage.getCartCount();
        expect(count, 'Card badge count is not as expected').toBe(2);
    });
});
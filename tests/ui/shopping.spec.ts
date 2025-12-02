import { test, expect } from '../../src/fixtures';

const ITEMS = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light'
];

test.describe('Shopping Cart Flow', () => {
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.goto();
    });

    test('Add single item to cart ubdated badge', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCart(ITEMS[0]);

        const count = await inventoryPage.getCartCount();
        expect(count, 'Cart badge should display 1 after adding a single item').toBe(1);
    });

    test('Add multiple items to cart', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCart(ITEMS[0]);
        await inventoryPage.addItemToCart(ITEMS[1]);

        const count = await inventoryPage.getCartCount();
        expect(count, 'Cart badge should display 2 after adding two items').toBe(2);
    });
});
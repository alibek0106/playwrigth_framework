import { test, expect } from '../../src/fixtures';
import { DataFactory } from '../../src/utils/DataFactory';
import { Routes } from '../../src/constants/Routes';

const PRODUCTS = {
    BACKPACK: 'Sauce Labs Backpack',
    BACKPACK_PRICE: '$29.99'
};

test.describe('SauceDemo Login & Order Flow', { tag: ['@ui', '@auth'] }, () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('Test Case 1: Verify successful login with standard user', async ({ page, loginPage, inventoryPage }) => {
        const credentials = DataFactory.getSauceUser();

        await test.step('Enter username and password', async () => {
            await loginPage.login(credentials.username, credentials.password);
        });

        await test.step('Verify Inventory page is opened', async () => {
            await expect(page, `Inventory should contain "${Routes.INVENTORY}"`).toHaveURL(Routes.INVENTORY);

            await expect(inventoryPage.title).toHaveText('Products');
        });
    });

    test('Test Case 2: Verify login failure with wrong password', async ({ loginPage }) => {
        const credentials = DataFactory.getInvalidSauceUser();

        await test.step('Enter username and wrong password', async () => {
            await loginPage.login(credentials.username, credentials.password);
        });

        await test.step('Verify error message is shown', async () => {
            await expect(loginPage.errorContainer, 'Error message should indicate password mismatch').toContainText('Epic sadface: Username and password do not match');
        });
    });

    test('Test Case 3: Verify adding item to cart after login', async ({ page, loginPage, inventoryPage, cartPage }) => {
        const credentials = DataFactory.getSauceUser();

        await test.step('Login as a standard user', async () => {
            await loginPage.login(credentials.username, credentials.password);
            await expect(page, `Inventory should contain "${Routes.INVENTORY}"`).toHaveURL(Routes.INVENTORY);
        });

        await test.step(`Add "${PRODUCTS.BACKPACK}" to cart`, async () => {
            await inventoryPage.addItemToCart(PRODUCTS.BACKPACK);

            const count = await inventoryPage.getCartCount();
            expect(count, 'Cart badge should show 1').toBe(1);
        });

        await test.step('Navigate to cart and verify item details', async () => {
            await inventoryPage.goToCart();
            const productItem = cartPage.getItem(PRODUCTS.BACKPACK);

            await expect(productItem, `"${PRODUCTS.BACKPACK}" should be visible in the cart`).toBeVisible();

            await expect(productItem, `Price should be ${PRODUCTS.BACKPACK_PRICE}`).toContainText(PRODUCTS.BACKPACK_PRICE);
        });
    });
});
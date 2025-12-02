import { test, expect } from '../../src/fixtures';
import { DataFactory } from '../../src/utils/DataFactory';
import { Routes } from '../../src/constants/Routes';
import { PRODUCTS } from '../../src/constants/Products';
import { LoginSteps } from '../../src/steps/LoginSteps';

test.describe('SauceDemo Login & Order Flow', { tag: ['@ui', '@auth'] }, () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('Test Case 1: Verify successful login with standard user', async ({ page, inventoryPage, loginSteps }) => {
        const credentials = DataFactory.getSauceUser();

        await test.step('Perform standart user login', async () => {
            await loginSteps.performStandardLogin();
        });

        await test.step('Verify inventory page is opened', async () => {
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

        await test.step(`Add "${PRODUCTS.BACKPACK.name}" to cart`, async () => {
            await inventoryPage.addItemToCart(PRODUCTS.BACKPACK.name);

            const count = await inventoryPage.getCartCount();
            expect(count, 'Cart badge should show 1').toBe(1);
        });

        await test.step('Navigate to cart and verify item details', async () => {
            await inventoryPage.goToCart();
            const productItem = cartPage.getItem(PRODUCTS.BACKPACK.name);

            await expect(productItem, `"${PRODUCTS.BACKPACK.name}" should be visible in the cart`).toBeVisible();

            await expect(productItem, `Price should be ${PRODUCTS.BACKPACK.price}`).toContainText(PRODUCTS.BACKPACK.price);
        });
    });
});
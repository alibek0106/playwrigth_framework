import { test, expect } from '../../src/fixtures';
import { DataFactory } from '../../src/utils/DataFactory';
import { Routes } from '../../src/constants/Routes';
import { PRODUCTS } from '../../src/constants/Products';

test.describe('Cart Page Tests', { tag: ['@ui', '@cart'] }, () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await test.step('Login and navigate to inventory', async () => {
            const credentials = DataFactory.getSauceUser();
            await loginPage.goto();
            await loginPage.login(credentials.username, credentials.password);
            await expect(inventoryPage.title, 'Should be on inventory page').toHaveText('Products');
        });
    });

    test('Test Case 1: Verify cart displays added items correctly', async ({ page, inventoryPage, cartPage }) => {
        await test.step(`Add "${PRODUCTS.BACKPACK.name}" to cart`, async () => {
            await inventoryPage.addItemToCart(PRODUCTS.BACKPACK.name);

            const cartCount = await inventoryPage.getCartCount();
            expect(cartCount, 'Cart badge should show 1 item').toBe(1);
        });

        await test.step('Navigate to cart page', async () => {
            await inventoryPage.goToCart();
            await expect(page, 'Should navigate to cart page').toHaveURL(Routes.CART);
        });

        await test.step('Verify item is displayed in cart', async () => {
            const productItem = cartPage.getItem(PRODUCTS.BACKPACK.name);

            await expect(productItem, `"${PRODUCTS.BACKPACK.name}" should be visible in cart`).toBeVisible();
            await expect(productItem, `Price should be ${PRODUCTS.BACKPACK.price}`).toContainText(PRODUCTS.BACKPACK.price);
        });

        await test.step('Verify cart action buttons are present', async () => {
            await expect(cartPage.checkoutBtn, 'Checkout button should be visible').toBeVisible();
            await expect(cartPage.continueShoppingBtn, 'Continue Shopping button should be visible').toBeVisible();
        });
    });

    test('Test Case 2: Verify multiple items can be added to cart', async ({ page, inventoryPage, cartPage }) => {
        await test.step('Add multiple items to cart', async () => {
            await inventoryPage.addItemToCart(PRODUCTS.BACKPACK.name);
            await inventoryPage.addItemToCart(PRODUCTS.BIKE_LIGHT.name);
            await inventoryPage.addItemToCart(PRODUCTS.BOLT_TSHIRT.name);

            const cartCount = await inventoryPage.getCartCount();
            expect(cartCount, 'Cart badge should show 3 items').toBe(3);
        });

        await test.step('Navigate to cart and verify all items', async () => {
            await inventoryPage.goToCart();
            await expect(page, 'Should navigate to cart page').toHaveURL(Routes.CART);

            const itemCount = await cartPage.cartItems.count();
            expect(itemCount, 'Cart should contain 3 items').toBe(3);
        });

        await test.step('Verify each item is displayed with correct details', async () => {
            const backpackItem = cartPage.getItem(PRODUCTS.BACKPACK.name);
            const bikeLightItem = cartPage.getItem(PRODUCTS.BIKE_LIGHT.name);
            const tshirtItem = cartPage.getItem(PRODUCTS.BOLT_TSHIRT.name);

            await expect(backpackItem, `"${PRODUCTS.BACKPACK.name}" should be visible`).toBeVisible();
            await expect(backpackItem, `Backpack price should be ${PRODUCTS.BACKPACK.price}`).toContainText(PRODUCTS.BACKPACK.price);

            await expect(bikeLightItem, `"${PRODUCTS.BIKE_LIGHT.name}" should be visible`).toBeVisible();
            await expect(bikeLightItem, `Bike Light price should be ${PRODUCTS.BIKE_LIGHT.price}`).toContainText(PRODUCTS.BIKE_LIGHT.price);

            await expect(tshirtItem, `"${PRODUCTS.BOLT_TSHIRT.name}" should be visible`).toBeVisible();
            await expect(tshirtItem, `T-Shirt price should be ${PRODUCTS.BOLT_TSHIRT.price}`).toContainText(PRODUCTS.BOLT_TSHIRT.price);
        });
    });

    test('Test Case 3: Verify item can be removed from cart', async ({ page, inventoryPage, cartPage }) => {
        await test.step('Add two items to cart', async () => {
            await inventoryPage.addItemToCart(PRODUCTS.BACKPACK.name);
            await inventoryPage.addItemToCart(PRODUCTS.BIKE_LIGHT.name);

            const cartCount = await inventoryPage.getCartCount();
            expect(cartCount, 'Cart badge should show 2 items').toBe(2);
        });

        await test.step('Navigate to cart', async () => {
            await inventoryPage.goToCart();
            await expect(page, 'Should navigate to cart page').toHaveURL(Routes.CART);
        });

        await test.step(`Remove "${PRODUCTS.BACKPACK.name}" from cart`, async () => {
            await cartPage.removeItem(PRODUCTS.BACKPACK.name);

            const backpackItem = cartPage.getItem(PRODUCTS.BACKPACK.name);
            await expect(backpackItem, `"${PRODUCTS.BACKPACK.name}" should no longer be visible`).not.toBeVisible();
        });

        await test.step('Verify remaining item is still in cart', async () => {
            const bikeLightItem = cartPage.getItem(PRODUCTS.BIKE_LIGHT.name);
            await expect(bikeLightItem, `"${PRODUCTS.BIKE_LIGHT.name}" should still be visible`).toBeVisible();

            const itemCount = await cartPage.cartItems.count();
            expect(itemCount, 'Cart should contain 1 item').toBe(1);
        });
    });

    test('Test Case 4: Verify removing all items from cart', async ({ page, inventoryPage, cartPage }) => {
        await test.step('Add item to cart', async () => {
            await inventoryPage.addItemToCart(PRODUCTS.BACKPACK.name);

            const cartCount = await inventoryPage.getCartCount();
            expect(cartCount, 'Cart badge should show 1 item').toBe(1);
        });

        await test.step('Navigate to cart and remove item', async () => {
            await inventoryPage.goToCart();
            await expect(page, 'Should navigate to cart page').toHaveURL(Routes.CART);

            await cartPage.removeItem(PRODUCTS.BACKPACK.name);
        });

        await test.step('Verify cart is empty', async () => {
            const itemCount = await cartPage.cartItems.count();
            expect(itemCount, 'Cart should be empty').toBe(0);

            await expect(inventoryPage.cartBadge, 'Cart badge should not be visible when empty').not.toBeVisible();
        });
    });

    test('Test Case 5: Verify Continue Shopping button returns to inventory', async ({ page, inventoryPage, cartPage }) => {
        await test.step('Add item and navigate to cart', async () => {
            await inventoryPage.addItemToCart(PRODUCTS.BACKPACK.name);
            await inventoryPage.goToCart();
            await expect(page, 'Should navigate to cart page').toHaveURL(Routes.CART);
        });

        await test.step('Click Continue Shopping button', async () => {
            await cartPage.continueShoppingBtn.click();
        });

        await test.step('Verify navigation back to inventory page', async () => {
            await expect(page, 'Should navigate back to inventory page').toHaveURL(Routes.INVENTORY);
            await expect(inventoryPage.title, 'Inventory page title should be visible').toHaveText('Products');
        });

        await test.step('Verify cart still contains the item', async () => {
            const cartCount = await inventoryPage.getCartCount();
            expect(cartCount, 'Cart badge should still show 1 item').toBe(1);
        });
    });

    test('Test Case 6: Verify checkout button navigates to checkout page', async ({ page, inventoryPage, cartPage }) => {
        await test.step('Add item and navigate to cart', async () => {
            await inventoryPage.addItemToCart(PRODUCTS.BACKPACK.name);
            await inventoryPage.goToCart();
            await expect(page, 'Should navigate to cart page').toHaveURL(Routes.CART);
        });

        await test.step('Click checkout button', async () => {
            await cartPage.goToCheckout();
        });

        await test.step('Verify navigation to checkout page', async () => {
            await expect(page, 'Should navigate to checkout page').toHaveURL(/checkout/);
        });
    });

    test('Test Case 7: Verify direct navigation to cart with empty cart', async ({ page, cartPage }) => {
        await test.step('Navigate directly to cart page', async () => {
            await cartPage.goto();
            await expect(page, 'Should navigate to cart page').toHaveURL(Routes.CART);
        });

        await test.step('Verify cart is empty', async () => {
            const itemCount = await cartPage.cartItems.count();
            expect(itemCount, 'Cart should be empty').toBe(0);
        });

        await test.step('Verify action buttons are still available', async () => {
            await expect(cartPage.continueShoppingBtn, 'Continue Shopping button should be visible').toBeVisible();
            await expect(cartPage.checkoutBtn, 'Checkout button should be visible').toBeVisible();
        });
    });
});

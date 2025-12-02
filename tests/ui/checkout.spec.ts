import { test, expect } from '../../src/fixtures';
import { DataFactory } from '../../src/utils/DataFactory';

const PRODUCT = {
    NAME: 'Sauce Labs Backpack',
    PRICE: '29.99'
};

test.describe('Checkout Workflow', { tag: ['@ui', '@regression'] }, () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.goto();
        await inventoryPage.addItemToCart(PRODUCT.NAME);
    });

    test('Verify item appears in cart', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.goToCart();
        await expect(cartPage.getItem(PRODUCT.NAME), `Cart should contain "${PRODUCT.NAME}"`).toBeVisible();
    });

    test('Remove item from cart', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.goToCart();
        await cartPage.removeItem(PRODUCT.NAME);
        await expect(cartPage.cartItems, `"${PRODUCT.NAME}" should be hidden after removal`).toBeHidden();
    });

    test('Checkout Validation - Empty Form', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.goToCart();
        await cartPage.goToCheckout();
        await checkoutPage.submitForm();
        await expect(checkoutPage.errorContainer, 'Error message should appear when submitting empty form').toContainText('Error: First Name is required');
    });

    test('Checkout Validation - Missing Zip Code', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.goToCart();
        await cartPage.goToCheckout();

        const randomUser = DataFactory.getCheckoutDetails();
        await checkoutPage.fillForm(randomUser.firstName, randomUser.lastName, ''); // Empty Zip
        await checkoutPage.submitForm();

        await expect(checkoutPage.errorContainer, 'Error message should appear when Postal Code is missing').toContainText('Error: Postal Code is required');
    });

    test('Successful End-to-End Purchase', { tag: '@smoke' }, async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.goToCart();
        await cartPage.goToCheckout();

        const checkoutData = DataFactory.getCheckoutDetails();
        await checkoutPage.fillForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.submitForm();

        await expect(checkoutPage.subtotalLabel, `Subtotal should match the item price of ${PRODUCT.PRICE}`).toContainText(PRODUCT.PRICE);

        await checkoutPage.finishCheckout();
        await expect(checkoutPage.completeHeader, 'Checkout complete header should be visible').toContainText('Thank you for your order!');
    });
});
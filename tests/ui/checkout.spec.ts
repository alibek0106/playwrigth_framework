import { test, expect } from '../../src/fixtures';
import { DataFactory } from '../../src/utils/DataFactory';

test.describe('Checkout Workflow', { tag: ['@ui', '@regression'] }, () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.goto();
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
    });

    test('Verify item appears in cart', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.goToCart();
        await cartPage.expectItemVisible('Sauce Labs Backpack');
    });

    test('Remove item from cart', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.goToCart();
        await cartPage.removeItem('Sauce Labs Backpack');
        await expect(cartPage.cartItems, 'Item is still visible in cart').toBeHidden();
    });

    test('Checkout Validation - Empty Form', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.goToCart();
        await cartPage.goToCheckout();
        await checkoutPage.continueBtn.click();
        await expect(checkoutPage.errorContainer, 'Error message does not contain expected text').toContainText('Error: First Name is required');
    });

    test('Checkout Validation - Missing Zip Code', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.goToCart();
        await cartPage.goToCheckout();

        const randomUser = DataFactory.getCheckoutDetails();
        await checkoutPage.fillInfo(randomUser.firstName, randomUser.lastName, ''); // Empty Zip

        await expect(checkoutPage.errorContainer, 'Error message does not contain expected text').toContainText('Error: Postal Code is required');
    });

    test('Successful End-to-End Purchase', { tag: '@smoke' }, async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.goToCart();
        await cartPage.goToCheckout();

        const checkoutData = DataFactory.getCheckoutDetails();
        await checkoutPage.fillInfo(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);

        await expect(checkoutPage.subtotalLabel, 'Subtotal does not contain expected price').toContainText('29.99');

        await checkoutPage.finishCheckout();
        await expect(checkoutPage.completeHeader, 'Header does not contain expected text').toContainText('Thank you for your order!');
    });
});
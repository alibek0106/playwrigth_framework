import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export type UiFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};

export const uiFixture = {
    loginPage: async ({ page }: { page: Page }, use: (r: LoginPage) => Promise<void>) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }: { page: Page }, use: (r: InventoryPage) => Promise<void>) => {
        await use(new InventoryPage(page));
    },
    cartPage: async ({ page }: { page: Page }, use: (r: CartPage) => Promise<void>) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }: { page: Page }, use: (r: CheckoutPage) => Promise<void>) => {
        await use(new CheckoutPage(page));
    },
};
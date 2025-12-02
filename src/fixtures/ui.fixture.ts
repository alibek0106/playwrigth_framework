import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { LoginSteps } from '../steps/LoginSteps';

export type UiFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    loginSteps: LoginSteps;
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
    loginSteps: async ({ page }: { page: Page }, use: (r: LoginSteps) => Promise<void>) => {
        await use(new LoginSteps(page));
    },
};
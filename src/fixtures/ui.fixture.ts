import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

export type UiFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
};

export const uiFixture = {
    loginPage: async ({ page }: { page: Page }, use: (r: LoginPage) => Promise<void>) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }: { page: Page }, use: (r: InventoryPage) => Promise<void>) => {
        await use(new InventoryPage(page));
    },
};
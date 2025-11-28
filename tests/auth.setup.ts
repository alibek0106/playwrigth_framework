import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_USER!, process.env.SAUCE_PASS!);
    await expect(page).toHaveURL(/.*inventory.html/);
    await page.context().storageState({ path: authFile });
});
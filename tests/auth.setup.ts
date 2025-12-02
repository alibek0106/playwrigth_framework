import { test as setup, expect } from '../src/fixtures';
import { DataFactory } from '../src/utils/DataFactory';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ loginPage, page }) => {
    const credentials = DataFactory.getSauceUser();

    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);

    await expect(page, 'Should navigate to inventory after successful login').toHaveURL(/.*inventory.html/);

    await page.context().storageState({ path: authFile });
});
import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { DataFactory } from '../utils/DataFactory';

export class LoginSteps {
    private loginPage: LoginPage;

    constructor(private page: Page) {
        this.loginPage = new LoginPage(page);
    }

    async performStandardLogin() {
        await this.loginPage.login(DataFactory.getSauceUser().username, DataFactory.getSauceUser().password);
    }
}

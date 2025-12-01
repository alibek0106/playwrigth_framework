import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueBtn: Locator;
    readonly finishBtn: Locator;
    readonly completeHeader: Locator;
    readonly errorContainer: Locator;
    readonly subtotalLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]').describe('First Name input field');
        this.lastNameInput = page.locator('[data-test="lastName"]').describe('Last Name input field');
        this.postalCodeInput = page.locator('[data-test="postalCode"]').describe('Postal Code input field');
        this.continueBtn = page.locator('[data-test="continue"]').describe('Continue button');
        this.finishBtn = page.locator('[data-test="finish"]').describe('Finish button');
        this.completeHeader = page.locator('.complete-header').describe('Complete header');
        this.errorContainer = page.locator('.error-message-container').describe('Error message container');
        this.subtotalLabel = page.locator('.summary_subtotal_label').describe('Subtotal label');
    }

    async fillInfo(firstName: string, lastName: string, zip: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(zip);
        await this.continueBtn.click();
    }

    async finishCheckout(): Promise<void> {
        await this.finishBtn.click();
    }
}
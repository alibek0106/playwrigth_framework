import { Page, Locator } from '@playwright/test';
import { Routes } from '../constants/Routes';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutBtn: Locator;
    readonly continueShoppingBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item').describe('Cart items');
        this.checkoutBtn = page.locator('[data-test="checkout"]').describe('Checkout button');
        this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]').describe('Continue shopping button');
    }

    async goto(): Promise<void> {
        await this.page.goto(Routes.CART);
    }

    getItem(productName: string): Locator {
        return this.cartItems.filter({ hasText: productName });
    }

    async removeItem(productName: string): Promise<void> {
        await this.getItem(productName).getByRole('button', { name: 'Remove' }).click();
    }

    async goToCheckout(): Promise<void> {
        await this.checkoutBtn.click();
    }
}
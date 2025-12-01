import { Page, Locator, expect } from '@playwright/test';
import { Routes } from '../constants/Routes';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addItemToCart(productName: string) {
        const productCard = this.inventoryItems.filter({ hasText: productName });
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    async getCartCount(): Promise<number> {
        if (await this.cartBadge.isVisible()) {
            const count = await this.cartBadge.textContent();
            return parseInt(count || '0');
        }
        return 0;
    }

    async goto() {
        await this.page.goto(Routes.INVENTORY);
    }
}
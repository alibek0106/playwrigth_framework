import { Page, Locator } from '@playwright/test';
import { Routes } from '../constants/Routes';

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly inventoryItems: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        // Using semantic selectors where possible, data-test attributes for stability
        this.title = page.locator('[data-test="title"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }

    async addItemToCart(productName: string) {
        const productCard = this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    async getCartCount(): Promise<number> {
        try {
            const count = await this.cartBadge.textContent({ timeout: 2000 });
            return parseInt(count || '0');
        } catch {
            // Cart badge not visible means cart is empty
            return 0;
        }
    }

    async goto() {
        await this.page.goto(Routes.INVENTORY);
    }

    async goToCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
}
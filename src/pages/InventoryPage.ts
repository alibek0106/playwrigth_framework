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
        this.title = page.locator('.title').describe('Inventory Page title');
        this.inventoryItems = page.locator('.inventory_item').describe('Inventory items');
        this.cartBadge = page.locator('.shopping_cart_badge').describe('Cart badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]').describe('Sort dropdown');
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

    async goToCart() {
        await this.cartBadge.click();
    }
}
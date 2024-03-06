import { Page } from '@playwright/test';
export class Category {
    constructor(
        public page: Page,
        // public categoryName: CategoryName can be used to build different pages
    ) {}

    root = this.page.getByTestId('grid');
    breadcrumbEntry = this.root.locator('.breadcrumb__entry').last();
    productInfo = this.root.locator('.product-info');
}

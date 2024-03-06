import { Page } from '@playwright/test';

export class CategoryNavigation {
    constructor(public page: Page) {}

    root = this.page.locator('.navigation-main');
    categoryByText = (text: string) => this.root.locator('.link--nav-heading').filter({ hasText: text });
}

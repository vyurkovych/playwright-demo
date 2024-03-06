import { Page } from '@playwright/test';
import { CookieConsent } from './components/CookieConsent';
import { CategoryNavigation } from '@pages/components/CategoryNavigation';
import { Category } from '@pages/components/Category';
import { Filters } from '@pages/components/Filters';
import { CategoryName } from '@pages/types';

export class AppPage {
    constructor(public page: Page) {}

    cookieConsent = new CookieConsent(this.page);
    categoryNavigation = new CategoryNavigation(this.page);
    category = new Category(this.page);
    filters = new Filters(this.page);

    logo = this.page.getByTestId('header-component-item--logo').first();
    async open() {
        await this.page.goto('/');
    }

    async openCategory(category: CategoryName) {
        await this.categoryNavigation.categoryByText(category).click();
        await this.logo.hover();
    }
}

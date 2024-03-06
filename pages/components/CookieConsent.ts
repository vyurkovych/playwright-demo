import { Page } from '@playwright/test';

export class CookieConsent {
    constructor(public page: Page) {}

    root = this.page.locator('[class^="modal-overlay__display"]');
    title = this.root.locator('.uc-banner-title');

    buttons = {
        acceptAll: this.root.locator('.uc-list-button__accept-all'),
        moreInfo: this.root.locator('.uc-list-button__more-information'),
        denyAll: this.root.locator('uc-list-button__deny-all'),
    };

    async acceptAll() {
        await this.buttons.acceptAll.click();
    }
}

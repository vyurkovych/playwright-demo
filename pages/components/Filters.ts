import { Page } from '@playwright/test';
import { expect } from 'fixtures';

export type FilterTitle = 'Highlights' | 'Marke' | 'Produktart' | 'Geschenk fur' | 'Für Wen'

const moreThan9ProductsRegex = /\(([1-9]\d+|[2-9])\)/;
export class Filters {
    constructor(
        public page: Page,
        // public categoryName: CategoryName can be used to build different pages
    ) {}

    root = this.page.locator('.facet-list');
    openedFiltersByTitle = (title: FilterTitle) => this.root.locator('.facet--open')
        .filter({
            has: this.page.locator('.facet__title').filter({ hasText: title })
        });

    filterByTitle = (title: FilterTitle) => this.root.locator('.facet__title').filter({ hasText: title });
    buttons = {
        close: this.root.locator('.facet__close-button')
    };

    async open(title: FilterTitle)  {
        await this.filterByTitle(title).click();
        await expect(this.openedFiltersByTitle(title)).toBeVisible();
    }

    async applyFilterOption(title: FilterTitle, optionText: RegExp | string = moreThan9ProductsRegex) {
        await this.open(title);
        const optionToSelect = this.openedFiltersByTitle(title)
            .getByRole('checkbox',{ name: optionText })
            .first();

        await optionToSelect.click({ timeout: 5_000 });
        await expect(optionToSelect).toBeChecked();

        await this.buttons.close.click();
        await expect(this.openedFiltersByTitle(title)).toBeHidden();
    }
}

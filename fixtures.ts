import { test as base } from '@playwright/test';
import { AppPage } from '@pages/AppPage';

export const test = base.extend<{
    app: AppPage,
}>({
    app: async ({ page }, use) => {
        const p = new AppPage(page);
        await p.open();
        await use(p);
    }
});

export { expect } from '@playwright/test';

import { expect, test } from 'fixtures';
import { FilterTitle } from '@pages/components/Filters';
import { CategoryName } from '@pages/types';

const testCases: {
  mainFilter: {
    title: FilterTitle,
    value: string
  }
  filtersToApply: FilterTitle[]
}[] = [{
  mainFilter: {
    title: 'Highlights',
    value: 'Sale'
  },
  filtersToApply: [
      'Marke',
      'Produktart',
      'Für Wen',
  ] }, {
  mainFilter: {
    title: 'Highlights',
    value: 'Neu'
  },
  filtersToApply: [
    'Produktart',
    'Für Wen',
  ] }, {
  mainFilter: {
    title: 'Highlights', // issue: .mint-stripe-headline element overlays filter option
    value: 'Limitiert'
  },
  filtersToApply: [
    'Marke',
    'Produktart',
    'Geschenk fur',
    'Für Wen',
  ] },
];

for(const { filtersToApply, mainFilter } of testCases) {
  test(`list "${mainFilter.title} - ${mainFilter.value}" products`, async ({ page, app }) => {
    const {
      cookieConsent,
      category,
        filters,
    } = app;

    await test.step('verify cookie consent title and click Accept All', async () => {
      await expect(cookieConsent.title).toHaveText('Privatsphäre-Einstellungen');
      await cookieConsent.acceptAll();
    });

    await test.step(`open ${CategoryName.Parfum}`, async () => {
      await app.openCategory(CategoryName.Parfum);
      await expect(category.breadcrumbEntry).toHaveText(CategoryName.Parfum, { ignoreCase: true });
    });

    await test.step(`apply main filter as "${mainFilter.title} - ${mainFilter.value}"`, async () => {
      await filters.applyFilterOption(mainFilter.title, mainFilter.value);
      await expect(page.locator('.product-info').first()).toBeVisible();
    });

    for (const filter of filtersToApply) {
      await test.step(`apply additional filter for "${filter}" field`, async () => {
        await filters.applyFilterOption(filter);
        await expect(category.productInfo.first()).toBeVisible();
      });
    }
  });
}

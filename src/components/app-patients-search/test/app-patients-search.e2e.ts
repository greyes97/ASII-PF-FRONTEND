import { newE2EPage } from '@stencil/core/testing';

describe('app-patients-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-patients-search></app-patients-search>');

    const element = await page.find('app-patients-search');
    expect(element).toHaveClass('hydrated');
  });
});

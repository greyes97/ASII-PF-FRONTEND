import { newE2EPage } from '@stencil/core/testing';

describe('app-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-search></app-search>');

    const element = await page.find('app-search');
    expect(element).toHaveClass('hydrated');
  });
});

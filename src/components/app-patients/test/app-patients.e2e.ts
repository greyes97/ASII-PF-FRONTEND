import { newE2EPage } from '@stencil/core/testing';

describe('app-patients', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-patients></app-patients>');

    const element = await page.find('app-patients');
    expect(element).toHaveClass('hydrated');
  });
});

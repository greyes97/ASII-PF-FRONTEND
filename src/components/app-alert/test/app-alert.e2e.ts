import { newE2EPage } from '@stencil/core/testing';

describe('app-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-alert></app-alert>');

    const element = await page.find('app-alert');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('app-prescription', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-prescription></app-prescription>');

    const element = await page.find('app-prescription');
    expect(element).toHaveClass('hydrated');
  });
});

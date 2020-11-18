import { newE2EPage } from '@stencil/core/testing';

describe('app-history', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-history></app-history>');

    const element = await page.find('app-history');
    expect(element).toHaveClass('hydrated');
  });
});

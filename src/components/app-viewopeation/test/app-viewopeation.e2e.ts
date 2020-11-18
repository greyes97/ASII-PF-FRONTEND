import { newE2EPage } from '@stencil/core/testing';

describe('app-viewopeation', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-viewopeation></app-viewopeation>');

    const element = await page.find('app-viewopeation');
    expect(element).toHaveClass('hydrated');
  });
});

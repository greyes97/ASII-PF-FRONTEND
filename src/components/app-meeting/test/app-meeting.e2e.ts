import { newE2EPage } from '@stencil/core/testing';

describe('app-meeting', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-meeting></app-meeting>');

    const element = await page.find('app-meeting');
    expect(element).toHaveClass('hydrated');
  });
});

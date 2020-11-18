import { newE2EPage } from '@stencil/core/testing';

describe('app-meeting-new', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-meeting-new></app-meeting-new>');

    const element = await page.find('app-meeting-new');
    expect(element).toHaveClass('hydrated');
  });
});

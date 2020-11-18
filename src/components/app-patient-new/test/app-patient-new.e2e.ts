import { newE2EPage } from '@stencil/core/testing';

describe('app-patient-new', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-patient-new></app-patient-new>');

    const element = await page.find('app-patient-new');
    expect(element).toHaveClass('hydrated');
  });
});

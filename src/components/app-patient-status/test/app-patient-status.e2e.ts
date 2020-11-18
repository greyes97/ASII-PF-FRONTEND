import { newE2EPage } from '@stencil/core/testing';

describe('app-patient-status', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-patient-status></app-patient-status>');

    const element = await page.find('app-patient-status');
    expect(element).toHaveClass('hydrated');
  });
});

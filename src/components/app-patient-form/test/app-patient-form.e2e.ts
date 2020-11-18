import { newE2EPage } from '@stencil/core/testing';

describe('app-patient-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-patient-form></app-patient-form>');

    const element = await page.find('app-patient-form');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('app-patient-room-asignation', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-patient-room-asignation></app-patient-room-asignation>');

    const element = await page.find('app-patient-room-asignation');
    expect(element).toHaveClass('hydrated');
  });
});

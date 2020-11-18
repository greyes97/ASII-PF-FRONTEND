import { newSpecPage } from '@stencil/core/testing';
import { AppPatientStatus } from '../app-patient-status';

describe('app-patient-status', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppPatientStatus],
      html: `<app-patient-status></app-patient-status>`,
    });
    expect(page.root).toEqualHtml(`
      <app-patient-status>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-patient-status>
    `);
  });
});

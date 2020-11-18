import { newSpecPage } from '@stencil/core/testing';
import { AppPatientNew } from '../app-patient-new';

describe('app-patient-new', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppPatientNew],
      html: `<app-patient-new></app-patient-new>`,
    });
    expect(page.root).toEqualHtml(`
      <app-patient-new>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-patient-new>
    `);
  });
});

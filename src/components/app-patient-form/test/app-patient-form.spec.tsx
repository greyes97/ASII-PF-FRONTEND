import { newSpecPage } from '@stencil/core/testing';
import { AppPatientForm } from '../app-patient-form';

describe('app-patient-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppPatientForm],
      html: `<app-patient-form></app-patient-form>`,
    });
    expect(page.root).toEqualHtml(`
      <app-patient-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-patient-form>
    `);
  });
});

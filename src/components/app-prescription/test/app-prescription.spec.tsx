import { newSpecPage } from '@stencil/core/testing';
import { AppPrescription } from '../app-prescription';

describe('app-prescription', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppPrescription],
      html: `<app-prescription></app-prescription>`,
    });
    expect(page.root).toEqualHtml(`
      <app-prescription>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-prescription>
    `);
  });
});

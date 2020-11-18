import { newSpecPage } from '@stencil/core/testing';
import { AppPatients } from '../app-patients';

describe('app-patients', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppPatients],
      html: `<app-patients></app-patients>`,
    });
    expect(page.root).toEqualHtml(`
      <app-patients>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-patients>
    `);
  });
});

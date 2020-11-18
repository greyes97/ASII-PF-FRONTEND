import { newSpecPage } from '@stencil/core/testing';
import { AppPatientsSearch } from '../app-patients-search';

describe('app-patients-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppPatientsSearch],
      html: `<app-patients-search></app-patients-search>`,
    });
    expect(page.root).toEqualHtml(`
      <app-patients-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-patients-search>
    `);
  });
});

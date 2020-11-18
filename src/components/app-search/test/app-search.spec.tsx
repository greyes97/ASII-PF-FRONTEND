import { newSpecPage } from '@stencil/core/testing';
import { AppSearch } from '../app-search';

describe('app-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppSearch],
      html: `<app-search></app-search>`,
    });
    expect(page.root).toEqualHtml(`
      <app-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-search>
    `);
  });
});

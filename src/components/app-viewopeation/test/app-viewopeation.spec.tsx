import { newSpecPage } from '@stencil/core/testing';
import { AppViewopeation } from '../app-viewopeation';

describe('app-viewopeation', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppViewopeation],
      html: `<app-viewopeation></app-viewopeation>`,
    });
    expect(page.root).toEqualHtml(`
      <app-viewopeation>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-viewopeation>
    `);
  });
});

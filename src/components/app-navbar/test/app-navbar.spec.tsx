import { newSpecPage } from '@stencil/core/testing';
import { AppNavbar } from '../app-navbar';

describe('app-navbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppNavbar],
      html: `<app-navbar></app-navbar>`,
    });
    expect(page.root).toEqualHtml(`
      <app-navbar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-navbar>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { AppAlert } from '../app-alert';

describe('app-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppAlert],
      html: `<app-alert></app-alert>`,
    });
    expect(page.root).toEqualHtml(`
      <app-alert>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-alert>
    `);
  });
});

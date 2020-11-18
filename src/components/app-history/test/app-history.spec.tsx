import { newSpecPage } from '@stencil/core/testing';
import { AppHistory } from '../app-history';

describe('app-history', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppHistory],
      html: `<app-history></app-history>`,
    });
    expect(page.root).toEqualHtml(`
      <app-history>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-history>
    `);
  });
});

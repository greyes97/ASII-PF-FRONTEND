import { newSpecPage } from '@stencil/core/testing';
import { AppMeeting } from '../app-meeting';

describe('app-meeting', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppMeeting],
      html: `<app-meeting></app-meeting>`,
    });
    expect(page.root).toEqualHtml(`
      <app-meeting>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-meeting>
    `);
  });
});

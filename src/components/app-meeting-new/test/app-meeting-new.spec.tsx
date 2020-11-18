import { newSpecPage } from '@stencil/core/testing';
import { AppMeetingNew } from '../app-meeting-new';

describe('app-meeting-new', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppMeetingNew],
      html: `<app-meeting-new></app-meeting-new>`,
    });
    expect(page.root).toEqualHtml(`
      <app-meeting-new>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-meeting-new>
    `);
  });
});

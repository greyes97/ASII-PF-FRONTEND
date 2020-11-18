import { newSpecPage } from '@stencil/core/testing';
import { AppPatientRoomAsignation } from '../app-patient-room-asignation';

describe('app-patient-room-asignation', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppPatientRoomAsignation],
      html: `<app-patient-room-asignation></app-patient-room-asignation>`,
    });
    expect(page.root).toEqualHtml(`
      <app-patient-room-asignation>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-patient-room-asignation>
    `);
  });
});

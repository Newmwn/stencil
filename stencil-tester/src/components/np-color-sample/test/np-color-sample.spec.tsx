import { newSpecPage } from '@stencil/core/testing';
import { NpColorSample } from '../np-color-sample';

describe('np-color-sample', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NpColorSample],
      html: `<np-color-sample></np-color-sample>`,
    });
    expect(page.root).toEqualHtml(`
      <np-color-sample>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </np-color-sample>
    `);
  });
});

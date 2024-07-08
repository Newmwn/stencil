import { newSpecPage } from '@stencil/core/testing';
import { NpSlider } from '../np-slider';

describe('np-slider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NpSlider],
      html: `<np-slider></np-slider>`,
    });
    expect(page.root).toEqualHtml(`
      <np-slider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </np-slider>
    `);
  });
});

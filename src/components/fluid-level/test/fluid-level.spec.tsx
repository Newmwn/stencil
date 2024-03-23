import { newSpecPage } from '@stencil/core/testing';
import { FluidLevel } from '../fluid-level';

describe('fluid-level', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FluidLevel],
      html: `<fluid-level></fluid-level>`,
    });
    expect(page.root).toEqualHtml(`
      <fluid-level>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fluid-level>
    `);
  });
});

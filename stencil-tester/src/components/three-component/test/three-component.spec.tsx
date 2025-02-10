import { newSpecPage } from '@stencil/core/testing';
import { ThreeComponent } from '../three-component';

describe('three-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ThreeComponent],
      html: `<three-component></three-component>`,
    });
    expect(page.root).toEqualHtml(`
      <three-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </three-component>
    `);
  });
});

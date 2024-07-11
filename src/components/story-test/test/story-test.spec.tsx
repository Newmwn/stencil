import { newSpecPage } from '@stencil/core/testing';
import { StoryTest } from '../story-test';

describe('story-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StoryTest],
      html: `<story-test></story-test>`,
    });
    expect(page.root).toEqualHtml(`
      <story-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </story-test>
    `);
  });
});

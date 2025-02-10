import { newSpecPage } from '@stencil/core/testing';
import { TaskManager } from '../task-manager';

describe('task-manager', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaskManager],
      html: `<task-manager></task-manager>`,
    });
    expect(page.root).toEqualHtml(`
      <task-manager>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </task-manager>
    `);
  });
});

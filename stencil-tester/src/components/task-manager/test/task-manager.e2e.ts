import { newE2EPage } from '@stencil/core/testing';

describe('task-manager', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<task-manager></task-manager>');

    const element = await page.find('task-manager');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('fluid-level', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fluid-level></fluid-level>');

    const element = await page.find('fluid-level');
    expect(element).toHaveClass('hydrated');
  });
});

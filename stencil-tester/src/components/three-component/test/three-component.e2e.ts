import { newE2EPage } from '@stencil/core/testing';

describe('three-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<three-component></three-component>');

    const element = await page.find('three-component');
    expect(element).toHaveClass('hydrated');
  });
});

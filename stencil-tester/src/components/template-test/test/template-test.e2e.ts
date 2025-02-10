import { newE2EPage } from '@stencil/core/testing';

describe('template-test', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<template-test></template-test>');

    const element = await page.find('template-test');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('np-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<np-slider></np-slider>');

    const element = await page.find('np-slider');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('np-color-sample', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<np-color-sample></np-color-sample>');

    const element = await page.find('np-color-sample');
    expect(element).toHaveClass('hydrated');
  });
});

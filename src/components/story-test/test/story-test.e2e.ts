import { newE2EPage } from '@stencil/core/testing';

describe('story-test', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<story-test></story-test>');

    const element = await page.find('story-test');
    expect(element).toHaveClass('hydrated');
  });
});

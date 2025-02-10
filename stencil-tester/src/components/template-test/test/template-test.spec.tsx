import { newSpecPage } from '@stencil/core/testing';
import { TemplateTest } from '../template-test';

describe('template-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TemplateTest],
      html: `<template-test></template-test>`,
    });
    expect(page.root).toEqualHtml(`
      <template-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </template-test>
    `);
  });
});

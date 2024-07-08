import { Component, h } from '@stencil/core';

@Component({
  tag: 'components-test',
  styleUrl: 'components-test.scss',
  shadow: true,
})
export class ComponentsLibraryCoreTest {
  connectedCallback() {}

  componentDidLoad() {}
  render() {
    return (
      <div>
        <np-slider></np-slider>
      </div>
    );
  }
}

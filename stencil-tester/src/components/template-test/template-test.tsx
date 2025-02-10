import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'template-test',
  styleUrl: 'template-test.css',
  shadow: true,
})
export class TemplateTest {
  x = {name:'lool'};
  @Prop() arr
  render() {
    return (
      <Host>
        {this.arr.map((a) => <slot></slot>)}
      </Host>
    );
  }
}

import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {

  render() {
    return <task-manager></task-manager>
  }
}

import { Component, Host, Prop, Element, State, h } from '@stencil/core';

@Component({
  tag: 'tool-tip',
  styleUrl: 'tool-tip.css',
  shadow: true,
})
export class ToolTip {
  @Element() el
  @Prop() text
  @State() show = false
  ref

  componentDidLoad() {
    console.log(this.el.parentNode)
    this.el.parentNode.addEventListener('mouseover', (ev) => {
      ev.stopPropagation()
      this.show = true
      this.el.style.left = '120px'
    })
    this.el.parentNode.addEventListener('mouseleave', () => {
      this.show = false
    })
  }

  render() {
    return (
      <div class={{ "tool_tip": true, "show": this.show }}>
        <div style={{ width: 'fit-content', height: 'fit-content' }}>{this.text}</div>
      </div>
    );
  }
}

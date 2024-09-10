import { Component, Prop, State, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;
  @State() array = [{ label: "test", tot: 'tolltest' }, { label: "test1", tot: 'tolltest1' }, { label: "test2", tot: 'tolltest2' }, { label: "test3", tot: 'tolltest3' }]
  private getText(): string {
    return format(this.first, this.middle, this.last);
  }
  rf
  render() {
    return this.array.map((el) => {
      return (
        <div style={{ width: '100px', height: '100px', border: 'solid 1px' }}>
          <tool-tip text={el.tot}></tool-tip>
          <div >{el.label}</div>
        </div>
      );
    })
  }
}

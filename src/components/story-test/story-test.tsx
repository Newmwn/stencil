import { Component,Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { Color } from './color.enum';

@Component({
  tag: 'story-test',
  styleUrl: 'story-test.css',
  shadow: true,
})
export class StoryTest {

  /**
   * Color of the component
   * @name Color
   * @type {Color}
   * @default Red
   */
  @Prop() color:Color = Color.Red;

  /**
   * Text to display
   * @name Text
   * @type {string}
   */
  @Prop() text:string = ''

  /**
   * Event emitted by the component when clicked
   */
  @Event()  clickEventBy: EventEmitter<any>
  render() {
    return (
      <Host>
        <div style={{ color: this.color, border:'1px solid' }}  onClick={()=>this.clickEventBy.emit('Object Clicked')}>{this.text}</div>
      </Host>
    );
  }

}

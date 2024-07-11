import { Component, h } from '@stencil/core';
import { Color } from '../story-test/color.enum';

@Component({
  tag: 'components-test',
  styleUrl: 'components-test.scss',
  shadow: true,
})
export class ComponentsLibraryCoreTest {
  
  render() {
    return (
      <div>
        <story-test color={Color.Orange} text="Hello World" onClickEventBy={(event)=>console.log(event.detail)}></story-test>
      </div>
    );
  }
}

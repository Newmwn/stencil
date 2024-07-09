import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'components-test',
  styleUrl: 'components-test.scss',
  shadow: true,
})
export class ComponentsLibraryCoreTest {
  connectedCallback() {}

  @State() value = [0, 30];
  @State() newValue = [];
  from;
  to;
  componentDidLoad() {}
  componentWillLoad() {}

  onChangeEvent(event) {
    console.log('%csrccomponentscomponents-testcomponents-test.tsx:18 event.detail', 'color: #007acc;', event.detail);
    // this.to.value = event.detail;
    // this.from.value = event.detail[0];
    // this.to.value = event.detail[1];
    this.newValue = event.detail;
  }
  render() {
    return (
      <div>
        <np-slider
          value={this.value}
          onChangeEvent={event => {
            this.onChangeEvent(event);
          }}
        ></np-slider>
        {console.log('%csrccomponentscomponents-testcomponents-test.tsx:32 this.from.value', 'color: #007acc;', this.from?.value)}
        <input
          ref={el => (this.from = el)}
          type="number"
          value={this.newValue[0]}
          onInput={event => {
            this.value[0] = Number((event.composedPath()[0] as any).value);
            this.value = [...this.value];
          }}
        />
        <input
          ref={el => (this.to = el)}
          type="number"
          // onInput={event => {
          //   this.value[0] = Number((event.composedPath()[0] as any).value);
          //   this.value = [...this.value];
          // }}
          value={this.newValue[1]}
          onInput={event => {
            this.value[1] = (event.composedPath()[0] as any).value;
            this.value = [...this.value];
          }}
        />
      </div>
    );
  }
}

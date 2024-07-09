import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'components-test',
  styleUrl: 'components-test.scss',
  shadow: true,
})
export class ComponentsLibraryCoreTest {
  connectedCallback() {}

  @State() value = [0, 30];
  @State() from;
  @State() to;
  componentDidLoad() {}
  componentWillLoad() {}

  onChangeEvent(event) {
    console.log('%csrccomponentscomponents-testcomponents-test.tsx:18 event', 'color: #007acc;', event);
    this.from = event.detail[0];
    this.to = event.detail[1];
  }

  onInputChange() {
    this.value = [this.from, this.to];
  }
  render() {
    return (
      <div>
        <np-slider
          value={this.value}
          onChangeEvent={event => {
            this.onChangeEvent(event);
          }}
          onSlideEndEvent={event => {
            console.log('%csrccomponentscomponents-testcomponents-test.tsx:33 event', 'color: #007acc;', event);
          }}
        ></np-slider>
        <input
          type="number"
          value={this.from}
          onInput={event => {
            this.from = Number((event.composedPath()[0] as any).value);
            this.onInputChange();
          }}
        />
        <input
          type="number"
          value={this.to}
          onInput={event => {
            this.to = Number((event.composedPath()[0] as any).value);
            this.onInputChange();
          }}
        />
      </div>
    );
  }
}

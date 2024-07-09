import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'np-slider',
  styleUrl: 'np-slider.scss',
  shadow: true,
})
export class NpSlider {
  @Element() npElement;
  fromHandler: HTMLInputElement;
  toHandler: HTMLInputElement;

  oldValue = [];

  @State() _value: number | number[] = 0;
  @Prop({ attribute: 'value' }) value: number | number[] = 0;
  @Watch('value') watchValue(newValue: number | number[]) {
    if (!this.range) {
      this._value = typeof newValue === 'number' ? newValue : newValue[0];
    } else {
      this._value = newValue.constructor === Array && newValue.length < 3 && newValue.length > 0 ? (newValue.length > 1 ? newValue : [0, newValue[0]]) : [0, 0];
      if (this._value[0] !== this.oldValue[0] && this._value[0] >= this._value[1]) {
        this._value[1] = this._value[0];
      }
      if (this._value[1] !== this.oldValue[1] && this._value[1] <= this._value[0]) {
        this._value[0] = this._value[1];
      }
    }
    setTimeout(() => {
      this.oldValue = JSON.parse(JSON.stringify(this._value));
      this.fillSlider(this.fromHandler, this.toHandler, '#C6C6C6', '#25daa5', this.toHandler);
    });

    this.changeEvent.emit(this._value);
  }

  @Prop({ attribute: 'disabled' }) disabled: boolean = false;

  @Prop({ attribute: 'min' }) min: number = 0;

  @Prop({ attribute: 'max' }) max: number = 100;

  @Prop({ attribute: 'orientation' }) orientation: string = 'horizontal';

  @Prop({ attribute: 'step' }) step: number = 1;

  @Prop({ attribute: 'range' }) range: boolean = true;

  @Prop() sliderStyle: any;

  @Prop() styleClass: string;

  @Prop() ariaLabelledBy: string;

  @Prop() tabindex: number = 0;

  @Event() changeEvent: EventEmitter<any>;

  @Event() slideEndEvent: EventEmitter<any>;

  componentWillLoad() {
    this.watchValue(this.value);
  }

  componentDidLoad() {
    this.fillSlider(this.fromHandler, this.toHandler, '#C6C6C6', '#25daa5', this.toHandler);
  }

  controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, event) {
    // console.log('%csrccomponents\np-slider\np-slider.tsx:69 event', 'color: #007acc;', event);
    if (this.disabled) return;
    const [from, to] = this.getParsed(fromSlider, toSlider);
    if (from > to) {
      this._value = !this.range ? from : [to, from];
      this.fillSlider(toSlider, fromSlider, '#C6C6C6', '#25daa5', toSlider);
    } else {
      this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
      this._value = !this.range ? from : [from, to];
    }
    console.log('%csrccomponents\np-slider\np-slider.tsx:80 this._Value', 'color: #007acc;', this._value);
    this.changeEvent.emit(this._value);
  }

  controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement) {
    if (this.disabled) return;
    const [from, to] = this.getParsed(fromSlider, toSlider);
    if (from <= to) {
      this._value = !this.range ? to : [from, to];
      this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    } else {
      this.fillSlider(toSlider, fromSlider, '#C6C6C6', '#25daa5', toSlider);
      this._value = !this.range ? to : [to, from];
    }
    this.changeEvent.emit(this._value);
  }

  getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement): [number, number] {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  fillSlider(from: HTMLInputElement, to: HTMLInputElement, sliderColor: string, rangeColor: string, controlSlider: HTMLInputElement) {
    if (this.disabled) return;
    const rangeDistance = parseInt(to.max) - parseInt(to.min);
    const fromPosition = parseInt(from.value) - parseInt(to.min);
    const toPosition = parseInt(to.value) - parseInt(to.min);
    controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
    ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
    ${sliderColor} 100%)`;
  }

  // Initial setup

  //#endregion Functions
  //#region RENDER
  render() {
    return (
      <div class="slider-container">
        <div class="slider-container--slider-control">
          <input
            ref={fromHandlerRef => (this.fromHandler = fromHandlerRef)}
            id="fromHandler"
            style={{ display: !this.range ? 'none' : 'unset', pointerEvents: 'none' }}
            disabled={this.disabled}
            type="range"
            min={this.min}
            max={this.max}
            step={this.step}
            value={!this.range ? 0 : this._value[0]}
            onInput={event => this.controlFromSlider(this.fromHandler, this.toHandler, event)}
          />
          <input
            ref={toHandlerRef => (this.toHandler = toHandlerRef)}
            disabled={this.disabled}
            style={{ pointerEvents: 'none' }}
            type="range"
            min={this.min}
            max={this.max}
            step={this.step}
            value={!this.range ? this._value : this._value[1]}
            onInput={event => this.controlToSlider(this.fromHandler, this.toHandler)}
          />
        </div>
      </div>
    );
  } //#endregion RENDER
}

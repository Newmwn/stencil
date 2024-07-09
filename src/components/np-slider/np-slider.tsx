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

  _value: number | number[] = 0;
  @Prop({ attribute: 'value' }) value: number | number[] = [10, 30];
  @Watch('value') watchValue(newValue: number | number[]) {
    if (!this.range) {
      this._value = typeof newValue === 'number' ? newValue : newValue[0];
    } else {
      this._value = newValue.constructor === Array && newValue.length < 3 && newValue.length > 0 ? (newValue.length > 1 ? newValue : [0, newValue[0]]) : [0, 0];
    }
  }

  @Prop({ attribute: 'disabled' }) disabled: boolean = false;

  @Prop({ attribute: 'min' }) min: number = 0;

  @Prop({ attribute: 'max' }) max: number = 100;

  @Prop({ attribute: 'orientation' }) orientation: string = 'horizontal';

  @Prop({ attribute: 'step' }) step: number;

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
    this.setToggleAccessible(this.toHandler);
  }

  controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement) {
    if (this.disabled) return;
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
      fromSlider.value = to.toString();
    }
    this._value = !this.range ? from : [from, to];
  }

  controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement) {
    if (this.disabled) return;
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    this.setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to.toString();
    } else {
      toSlider.value = from.toString();
    }
    this._value = !this.range ? to : [from, to];
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

  setToggleAccessible(currentTarget: HTMLInputElement): void {
    if (this.disabled) return;
    if (Number(currentTarget.value) <= 0) {
      this.toHandler.style.zIndex = '2';
    } else {
      this.toHandler.style.zIndex = '0';
    }
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
            class="slider-container--slider-control__fromHandler"
            style={{ display: !this.range ? 'none' : 'unset' }}
            disabled={this.disabled}
            type="range"
            defaultValue={!this.range ? 0 : this._value[0]}
            min={this.min}
            max={this.max}
            onInput={() => this.controlFromSlider(this.fromHandler, this.toHandler)}
          />
          <input
            ref={toHandlerRef => (this.toHandler = toHandlerRef)}
            disabled={this.disabled}
            type="range"
            defaultValue={!this.range ? this._value : this._value[1]}
            min={this.min}
            max={this.max}
            onInput={() => this.controlToSlider(this.fromHandler, this.toHandler)}
          />
        </div>
      </div>
    );
  } //#endregion RENDER
}

import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { ShadowDomHelper } from '../../utils/shadow-dom-helper';

@Component({
  tag: 'np-slider',
  styleUrl: 'np-slider.scss',
  shadow: true,
})
export class NpSlider {
  @Element() npElement;

  _value: number | number[] = 0;
  @Prop({ attribute: 'value' }) value: number | number[] = [10];
  @Watch('value') watchValue(newValue: number | number[]) {
    if (!this.range) {
      this._value = typeof newValue === 'number' ? newValue : newValue[0];
    } else {
      this._value = newValue.constructor === Array && newValue.length < 3 && newValue.length > 0 ? (newValue.length > 1 ? newValue : [0, newValue[0]]) : [0, 0];
    }
    console.log('%csrccomponents\np-slider\np-slider.tsx:20 this._value', 'color: #007acc;', this._value);
  }

  @Prop({ attribute: 'disabled' }) disabled: boolean = false;

  @Prop() min: number = 0;

  @Prop() max: number = 100;

  @Prop() orientation: string = 'horizontal';

  @Prop() step: number;

  @Prop() range: boolean = true;

  @Prop() sliderStyle: any;

  @Prop() styleClass: string;

  @Prop() ariaLabelledBy: string;

  @Prop() tabindex: number = 0;

  @Event() onChange: EventEmitter<any>;

  @Event() onSlideEnd: EventEmitter<any>;

  componentWillLoad() {
    this.watchValue(this.value);
  }

  componentDidLoad() {
    const fromSlider = ShadowDomHelper.searchElement(this.npElement, '#fromSlider') as HTMLInputElement;
    const toSlider = ShadowDomHelper.searchElement(this.npElement, '#toSlider') as HTMLInputElement;
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    this.setToggleAccessible(toSlider);

    fromSlider.oninput = () => this.controlFromSlider(fromSlider, toSlider);
    toSlider.oninput = () => this.controlToSlider(fromSlider, toSlider);
  }

  controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement) {
    if (this.disabled) return;
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
      fromSlider.value = to.toString();
    }
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
    const toSlider = ShadowDomHelper.searchElement(this.npElement, '#toSlider') as HTMLInputElement;
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = '2';
    } else {
      toSlider.style.zIndex = '0';
    }
  }

  // Initial setup

  //#endregion Functions
  //#region RENDER
  render() {
    return (
      <div class="range_container">
        <div class="sliders_control">
          <input disabled={this.disabled} style={{ visibility: 'hidden' }} id="fromSlider" type="range" defaultValue="0" min="0" max="100" />
          <input disabled={this.disabled} id="toSlider" type="range" defaultValue="30" min="0" max="100" />
        </div>
      </div>
    );
  } //#endregion RENDER
}

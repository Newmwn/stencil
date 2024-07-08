import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { ShadowDomHelper } from '../../utils/shadow-dom-helper';

@Component({
  tag: 'np-slider',
  styleUrl: 'np-slider.scss',
  shadow: true,
})
export class NpSlider {
  @Element() el;
  // TypeScript function definitions
  controlFromInput(fromSlider: HTMLInputElement, fromInput: HTMLInputElement, toInput: HTMLInputElement, controlSlider: HTMLInputElement): void {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
      fromSlider.value = to.toString();
      fromInput.value = to.toString();
    } else {
      fromSlider.value = from.toString();
    }
  }

  controlToInput(toSlider: HTMLInputElement, fromInput: HTMLInputElement, toInput: HTMLInputElement, controlSlider: HTMLInputElement): void {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    this.setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = to.toString();
      toInput.value = to.toString();
    } else {
      toInput.value = from.toString();
    }
  }

  controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement): void {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
      fromSlider.value = to.toString();
    }
  }

  controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement): void {
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
    console.log('%clibrary-coresrccomponents\np-slider\np-slider.tsx:64 to', 'color: #007acc;', to);
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
    const toSlider = ShadowDomHelper.searchElement(this.el, '#toSlider') as HTMLInputElement;
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = '2';
    } else {
      toSlider.style.zIndex = '0';
    }
  }

  // Initial setup

  componentDidLoad() {
    const fromSlider = ShadowDomHelper.searchElement(this.el, '#fromSlider') as HTMLInputElement;
    const toSlider = ShadowDomHelper.searchElement(this.el, '#toSlider') as HTMLInputElement;
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    this.setToggleAccessible(toSlider);

    fromSlider.oninput = () => this.controlFromSlider(fromSlider, toSlider);
    toSlider.oninput = () => this.controlToSlider(fromSlider, toSlider);
  }

  //#endregion Functions
  //#region RENDER
  render() {
    return (
      <div class="range_container">
        <div class="sliders_control">
          <input id="fromSlider" type="range" defaultValue="50" min="0" max="100" />
          {/* <input id="toSlider" type="range" defaultValue="30" min="0" max="100" /> */}
        </div>
      </div>
    );
  } //#endregion RENDER
}

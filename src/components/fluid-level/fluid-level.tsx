import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'fluid-level',
  styleUrl: 'fluid-level.scss',
  shadow: true,
})
export class FluidLevel {
  @State() percent:number = 0;
  @State() colorLevel = 'red';

  constructor() {

    // this.percent = 0; // Initialize percent variable

    let x = setInterval(() => {
      this.percent++;
      if(this.percent<=20){
        this.colorLevel = 'red'
      }
      else if( this.percent >20 && this.percent <= 50){
        this.colorLevel='orange'
      }
      else{
        this.colorLevel = 'green'
      }
      if (this.percent == 100) {
        clearInterval(x); // Clear interval when percent reaches 100
      }
    }, 200);
  }

  render() {
    return (
      <div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" x="0px" y="0px" style={{ display: 'none' }}>
        <symbol id="wave">
          <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
          <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
          <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
          <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
        </symbol>
      </svg>
        <div class="box">
          <div class="percent">
            <div class="percentNum" id="count">{this.percent}</div>
            <div class="percentB">%</div>
          </div>
          <div id="water" class="water" style={{ transform: 'translate(0' + ',' + (100 - this.percent) + '%)', '--teste':this.colorLevel }}>
            <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
              <use xlinkHref="#wave"></use>
            </svg>
            <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
              <use xlinkHref="#wave"></use>
            </svg>
          </div>
        </div></div>
    );
  }

}

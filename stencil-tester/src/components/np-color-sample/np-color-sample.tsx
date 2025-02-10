import { Component, Prop, h, Element, State } from '@stencil/core';

@Component({
  tag: 'np-color-sample',
  styleUrl: 'np-color-sample.css',
  shadow: true,
})
export class NpColorSample {
  @Element() host!: HTMLElement;

  /** Base color for the sphere */
  @Prop() color: string = '#ed0c0c';

  @State() widthRatio: number = 1;
  @State() heightRatio: number = 1;

  private isValidHex(hex: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(hex);
  }

  private darkenColor(hex: string, percent: number): string {
    if (!this.isValidHex(hex)) {
      console.warn('Invalid color format. Falling back to default color.');
      return '#000000';
    }

    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - Math.round(255 * percent));
    const g = Math.max(0, ((num >> 8) & 0x00ff) - Math.round(255 * percent));
    const b = Math.max(0, (num & 0x0000ff) - Math.round(255 * percent));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  componentDidRender() {
    const bounds = this.host.getBoundingClientRect();
    this.widthRatio = bounds.width / 200;
    this.heightRatio = bounds.height / 200;
  }

  render() {
    const darkColor = this.darkenColor(this.color, 0.3);
    const background = `
      radial-gradient(circle at ${10 * this.widthRatio}% ${10 * this.heightRatio}%, 
        ${this.color} 60%, 
        ${darkColor} 90%
      )
    `;

    const highlightBackground = `
      radial-gradient(circle at center, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 70%)
    `;

    return (
      <div
        class="sphere"
        style={{
          background,
          '--wRatio': `${this.widthRatio}`,
          '--hRatio': `${this.heightRatio}`,
        }}
      >
        <div class="highlight" style={{ background: highlightBackground }}></div>
      </div>
    );
  }
}

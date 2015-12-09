'use strict';

class BikeLights {
  constructor(renderer) {
    this.intensity = 0;
    this.color = {
      r: 0,
      g: 0,
      b: 0
    };
    this.renderer = renderer;
  }

  setIntensity(intensity) {
    this.intensity = intensity;
    this.renderer(this);
  }

  setRgb(percent) {
    let to255 = Math.round(percent * 2.55);
    this.color.r = to255;
    this.color.g = to255;
    this.renderer(this);
  }

  render() {
    console.log(`int: ${this.intensity}, { ${this.color.r}, ${this.color.g}, ${this.color.b} }`);
  }
}

module.exports = BikeLights;

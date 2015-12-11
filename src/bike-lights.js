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
    this.color.r = percent;
    this.color.g = (1 - percent);
    this.color.b = 0;
    this.renderer(this);
  }

  setBlue() {
    this.color.r = 0;
    this.color.g = 0;
    this.color.b = 1;
  }
}

module.exports = BikeLights;

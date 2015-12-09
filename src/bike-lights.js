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
    this.renderer(this);
  }
}

module.exports = BikeLights;

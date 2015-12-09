'use strict';

class BikeLights {
  constructor() {
    this.intensity = 0;
    this.color = {
      r: 0,
      g: 0,
      b: 0
    };
  }

  setIntensity(intensity) {
    this.intensity = intensity;
    this.render();
  }

  render() {
    console.log(`int: ${this.intensity}, { ${this.color.r}, ${this.color.g}, ${this.color.b} }`);
  }
}

module.exports = BikeLights;

'use strict';

var mapping = {
  r: 24,
  g: 23,
  b: 18
};

var blaster = require('pi-blaster.js');
module.exports = lights => {
  console.log(lights);
  let intensity = lights.intensity;
  blaster.setPwm(mapping.r, (lights.color.r * intensity) / 255);
  blaster.setPwm(mapping.g, Math.abs(1 - (lights.color.g * intensity) / 255));
  blaster.setPwm(mapping.b, (lights.color.b * intensity) / 255);
};

'use strict';

var mapping = {
  r: 24,
  g: 23,
  b: 18
};

var blaster = require('pi-blaster.js');
module.exports = lights => {
  let intensity = lights.intensity;
  blaster.setPwm(mapping.r, lights.color.r * intensity);
  blaster.setPwm(mapping.g, lights.color.g * intensity);
  blaster.setPwm(mapping.b, lights.color.b * intensity);
};

'use strict';

let render = lights => {
  console.log(`int: ${lights.intensity}, { ${lights.color.r}, ${lights.color.g}, ${lights.color.b} }`);
};

module.exports = render;

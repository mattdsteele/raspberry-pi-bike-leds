'use strict';

let pct = dec => Math.round(dec * 100);
let render = lights => {
  console.log(`int: ${lights.intensity}, { ${pct(lights.color.r)}, ${pct(lights.color.g)}, ${pct(lights.color.b)} }`);
};

module.exports = render;

'use strict';

let Easer = require('functional-easing').Easer;
let AnimationTimer = require('animation-timer').AnimationTimer;

let easer = new Easer().using('in-out-bounce');

let animation = new AnimationTimer()
  .duration('5s')
  .on('tick', easer(percent =>  console.log(Math.round(percent * 255)) ));

animation.bounce();

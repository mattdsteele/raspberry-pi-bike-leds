'use strict';

let Rx = require('rx');

let heartbeatStream = require('./mock-heartbeat-stream');
let animationEasing = require('./mock-animation-easing');
let BikeLights = require('./bike-lights');
let consoleRenderer = require('./console-renderer');
let ledRenderer = require('./led-renderer');

let toMillis = x => {
  return Rx.Observable
    .interval(1 / (x / 60) * 1000);
};

let beatAndOff = x => {
  return Rx.Observable
    .just('beat')
    .merge(Rx.Observable
           .timer(200)
           .map(e => 'off'));
};

let source = heartbeatStream
  .flatMapLatest(toMillis)
  .flatMap(beatAndOff)
  .take(50);

let curr = Date.now();
let lights = new BikeLights(ledRenderer);
let subscription = source.subscribe(
  x => {
    lights.setIntensity(x === 'beat' ? 1 : 0);
  },
  err => console.log('err'),
  () => console.log('done')
);

let animation = animationEasing.subscribe(
  x => lights.setRgb(x),
  e => console.log('err'),
  () => console.log('done')
);

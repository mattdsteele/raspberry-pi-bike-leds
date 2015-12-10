'use strict';

let Rx = require('rx');
let process = require('process');

let mockHeartbeatStream = require('./mock-heartbeat-stream');
let heartbeatStream = require('./heartbeat-stream');
let animationEasing = require('./mock-animation-easing');
let BikeLights = require('./bike-lights');
let consoleRenderer = require('./console-renderer');
let ledRenderer = require('./led-renderer');


let toMillis = x => {
  let periodicity = Math.round((1 / (x / 60) * 1000));
  return Rx.Observable.interval(periodicity);
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
  .flatMap(beatAndOff);

let curr = Date.now();
let lights = new BikeLights(ledRenderer);
let subscription = source.subscribe(
  x => {
    lights.setIntensity(x === 'beat' ? 1 : 0);
  },
  err => console.log('err'),
  () => {
    console.log('done');
    lights.setIntensity(1);
  }
);

let animation = animationEasing.subscribe(
  x => lights.setRgb(x),
  e => console.log('err'),
  () => console.log('done')
);

process.on('SIGINT', () => {
  lights.setIntensity(0);
  process.exit(0);
});

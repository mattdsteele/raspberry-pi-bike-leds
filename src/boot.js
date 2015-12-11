'use strict';

let Rx = require('rx');
let process = require('process');

let mockHeartbeatStream = require('./mock-heartbeat-stream');
let heartbeatStream = require('./heartbeat-stream');
let animationEasing = require('./mock-animation-easing');
let cadenceStream = require('./cadence-stream');
let BikeLights = require('./bike-lights');
let consoleRenderer = require('./console-renderer');
let ledRenderer = require('./led-renderer');

let remap = (value, fromLow, fromHigh, toLow, toHigh) => {
  return toLow + (toHigh - toLow) * (value - fromLow) / (fromHigh - fromLow);
};

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

/*
 let animation = animationEasing.subscribe(
  x => lights.setRgb(x),
  e => console.log('err'),
  () => console.log('done')
);
*/

cadenceStream.filter(x => !isNaN(x))
  .map(x => remap(x, 25, 100, 0, 1))
  .subscribe(
    x => lights.setRgb(x),
    e => console.log('err'),
    () => console.log('done')
  );


//There has to be a better way to do this...
let checkTimeout = () => {
  cadenceStream
    .timeout(5000)
    .subscribe(x => {},
      e => {
        lights.setIdleColor();
        checkTimeout();
      },
      x => {}
    );
};
checkTimeout();

process.on('SIGINT', () => {
  lights.setIntensity(0);
  process.exit(0);
});

'use strict';

let Rx = require('rx');
let Ant = require('ant-plus');
let stick = require('./ant-stick');

var sensor = new Ant.HeartRateSensor(stick);

stick.on('startup', function() {
  console.log('started up, gonna attatch');
  sensor.attach(0, 0);
});


module.exports = Rx.Observable.fromEvent(sensor, 'hbdata')
  .map(hb => hb.ComputedHeartRate)
  .distinctUntilChanged()
  .throttle(1000);

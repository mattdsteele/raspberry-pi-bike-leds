'use strict';

let Rx = require('rx');
let Ant = require('ant-plus');
let stick = require('./ant-stick');

var sensor = new Ant.HeartRateSensor(stick);

const mattHrDeviceId = 15193;

stick.on('startup', function() {
  console.log('started up, gonna attatch');
  sensor.attach(0, mattHrDeviceId);
});


module.exports = Rx.Observable.fromEvent(sensor, 'hbdata')
  .map(hb => hb.ComputedHeartRate)
  .distinctUntilChanged()
  .throttle(1000);

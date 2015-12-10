'use strict';

let Rx = require('rx');

var Ant = require('ant-plus');
var stick = new Ant.GarminStick2();
var sensor = new Ant.HeartRateSensor(stick);

stick.on('startup', function() {
  console.log('started up, gonna attatch');
  sensor.attach(0, 0);
});

if (!stick.open()) {
  console.log('stick not found');
}

module.exports = Rx.Observable.fromEvent(sensor, 'hbdata')
  .map(hb => hb.ComputedHeartRate)
  .distinctUntilChanged()
  .throttle(1000);

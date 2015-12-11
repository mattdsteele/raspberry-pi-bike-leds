'use strict';

let Rx = require('rx');
let Ant = require('ant-plus');
let stick = require('./ant-stick');

var sensor = new Ant.SpeedCadenceSensor(stick);

stick.on('startup', function() {
  console.log('started up, gonna attatch');
  sensor.attach(1, 0);
});


module.exports = Rx.Observable.fromEvent(sensor, 'cadenceData')
  .map(hb => hb.CalculatedCadence);

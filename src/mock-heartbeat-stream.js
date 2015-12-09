'use strict';

let Rx = require('rx');

module.exports = Rx.Observable
  .interval(1000)
  .timeInterval()
  .map(e => e.value >= 5 ? 60 : 200);

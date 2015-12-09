'use strict';

let Easer = require('functional-easing').Easer;
let AnimationTimer = require('animation-timer').AnimationTimer;
let Rx = require('rx');

let easer = new Easer().using('in-out-bounce');

module.exports = Rx.Observable.create(observer => {
  let animation = new AnimationTimer()
    .duration('5s')
    .on('tick', easer(percent =>  {
      observer.onNext(percent * 100);
    }))
    .bounce();
});

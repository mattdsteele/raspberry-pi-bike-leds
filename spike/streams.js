'use strict';

let Rx = require('rx');

let source = Rx.Observable
  .interval(1000)
  .timeInterval()
  .map(e => e.value >= 5 ? 60 : 200)
  .flatMapLatest(x => {
    return Rx.Observable
      .interval(1 / (x / 60) * 1000);
  })
  .flatMap(x => {
    return Rx.Observable
      .just('beat')
      .merge(Rx.Observable.timer(200).map(e => 'off'));
  })
  .take(50);

let subscription = source.subscribe(
  x => console.log(x),
  err => console.log('err'),
  () => console.log('done')
);


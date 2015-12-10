var Ant = require('ant-plus');
var stick = new Ant.GarminStick2();
var sensor = new Ant.HeartRateSensor(stick);
var prevData = 0;
if (!stick.open()) {
  console.log('stick not found');
}
sensor.on('hbdata', function(data) {
  var hr = data.ComputedHeartRate;
  if (hr !== prevData) {
    prevData = hr;
    console.log(new Date(), hr);
  }
});
stick.on('startup', function() {
  sensor.attach(0, 0);
});

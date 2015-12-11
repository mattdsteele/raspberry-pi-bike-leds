var Ant = require('ant-plus');
var stick = new Ant.GarminStick2();
stick.setMaxListeners(20);

var sensor = new Ant.HeartRateSensor(stick);
var speedSensor = new Ant.SpeedCadenceSensor(stick);

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

speedSensor.on('cadenceData', data => {
  console.log('cadence', data.CalculatedCadence);
});

speedSensor.on('speedData', data => {
  console.log('speed', data.CalculatedSpeed);
});

stick.on('startup', function() {
  console.log('start me up');
  sensor.attach(0, 0);
  speedSensor.attach(1, 0);
});

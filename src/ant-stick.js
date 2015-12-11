var Ant = require('ant-plus');
var stick = new Ant.GarminStick2();

if (!stick.open()) {
  console.log('stick not found');
}

module.exports = stick;

var blaster = require('pi-blaster.js');
var repl = require('repl');

var server = repl.start('> ');
server.defineCommand('c', color => {
  var mapping = {
    r: 24,
    g: 23,
    b: 18,
  };
  var split = color.split(' ');
  var abbr = split[0];
  var intensity = parseFloat(split[1]);
  var pin = mapping[abbr];
  blaster.setPwm(pin, intensity);
  server.displayPrompt();
});
server.on('exit', process.exit);

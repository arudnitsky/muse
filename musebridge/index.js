'use strict';

var settings = require('./settings.js');
var logger = require('./logger.js');
var oscRelay = require('./oscRelay.js');

const APP_NAME = 'MuseBridge';

logger.log('======================================================');
logger.log('                    ' + APP_NAME);
logger.log('======================================================');
logger.log(APP_NAME + ' started on ' + settings.localMachineIp);
logger.log('Press Ctrl-C to exit');

if (process.platform === 'win32') {
   var rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
   });

   rl.on('SIGINT', function() {
      process.emit('SIGINT');
   });
}

process.on('SIGINT', function() {
   logger.log(APP_NAME + ' shutting down');
   logger.log('======================================================');
   process.exit();
});

oscRelay.start();

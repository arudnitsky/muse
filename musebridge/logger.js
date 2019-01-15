'use strict';

var util = require('util');
var dateFormat = require('dateformat');

var shouldDumpData = false;
var shouldDumpClientCommand = false;

function getFormattedDate() {
   var now = new Date();
   return dateFormat(now, 'HH:MM:ss.l');
}

var log = function(data) {
   console.log(getFormattedDate() + ' ' + data);
};

var dumpData = function(type, data) {
   if (shouldDumpData) {
      console.log('--------------------------------------');
      console.log(getFormattedDate());
      console.log(type);
      console.log(util.inspect(data, { showHidden: false, depth: 1 }));
      console.log('--------------------------------------');
   }
};

var dumpClientCommand = function(cmd) {
   if (shouldDumpClientCommand) {
      log('Received client command:' + JSON.stringify(cmd));
   }
};

module.exports = {
   log: log,
   dumpData: dumpData,
   dumpClientCommand: dumpClientCommand
};

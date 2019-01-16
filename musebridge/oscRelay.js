var settings = require('./settings.js');
var logger = require('./logger.js');
var osc = require('osc');
var express = require('express');
var WebSocket = require('ws');

var getIPAddresses = function() {
   var os = require('os'),
      interfaces = os.networkInterfaces(),
      ipAddresses = [];

   for (var deviceName in interfaces) {
      var addresses = interfaces[deviceName];
      for (var i = 0; i < addresses.length; i++) {
         var addressInfo = addresses[i];
         if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
            ipAddresses.push(addressInfo.address);
         }
      }
   }

   return ipAddresses;
};

var start = function() {
   // Bind to a UDP socket to listen for incoming OSC events.
   var udpPort = new osc.UDPPort({
      localAddress: '0.0.0.0',
      localPort: settings.receiveUdpPort
   });

   udpPort.on('ready', function() {
      var ipAddresses = getIPAddresses();
      logger.log('Listening for OSC over UDP.');
      ipAddresses.forEach(function(address) {
         var message = 'Host: ' + address + ', Port: ' + udpPort.options.localPort;
         logger.log(message);
      });
      logger.log(
         'To start the demo, go to http://localhost:8081 in your web browser.'
      );
   });

   udpPort.open();

   // Create an Express-based Web Socket server to which OSC messages will be relayed.
   var appResources = __dirname + '/client/build',
      app = express(),
      server = app.listen(8081),
      wss = new WebSocket.Server({
         server: server
      });

   app.use('/', express.static(appResources));
   wss.on('connection', function(socket) {
      logger.log('A Web Socket connection has been established!');
      var socketPort = new osc.WebSocketPort({
         socket: socket
      });

      var relay = new osc.Relay(udpPort, socketPort, {
         raw: true
      });
   });

   udpPort.on('message', function(msg, info) {
      console.log('oscRelay UDP Message: address: ' + msg.address + ', args: ' + msg.args);
      // if (msg.address === '/muse/algorithm/concentration') {
      //    console.log('Message: address: ' + msg.address + ', args: ' + msg.args[0]);
      // }
   });

};

module.exports = {
   start: start
};

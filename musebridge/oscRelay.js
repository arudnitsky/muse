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
      localAddress: '0.0.0.0', // listen on all interface   //settings.oscRelayIpAddress,
      localPort: settings.oscRelayReceiveUdpPort
   });

   udpPort.on('ready', function() {
      var ipAddresses = getIPAddresses();
      logger.log('Listening for OSC over UDP.');
      ipAddresses.forEach(function(address) {
         var message = '   Host: ' + address + ':' + udpPort.options.localPort;
         logger.log(message);
      });
      logger.log(
         'To start the demo, open http://' + settings.oscRelayIpAddress + ':' + 
         settings.demoWebsitePort + ' in your web browser.'
      );
   });

   udpPort.open();

   // Serve up the React website that will connnect to the WebSocket.
   var app = express();
   var server = app.listen(settings.demoWebsitePort);
   app.use('/', express.static(__dirname + '/client/build'));
   
   // Create an Express-based Web Socket server to which OSC messages will be relayed.
   var wss = new WebSocket.Server({
      server: server
   });
   
   // Set up the OSC relay from UDP to the WebSocket
   wss.on('connection', function(socket) {
      logger.log('An incoming WebSocket connection has been established!');
      socketPort = new osc.WebSocketPort({
         socket: socket
      });

      var relay = new osc.Relay(udpPort, socketPort, { raw: true }); // technically not a supported Osc.js API function
   });

   udpPort.on('message', function(msg, info) {
      console.log('UDP Message: address: ' + msg.address + ', args: ' + msg.args);
   });
};

module.exports = {
   start: start
};

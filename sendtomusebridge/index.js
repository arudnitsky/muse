var osc = require('osc');
var messageGenerator = require('./MessageGenerator');
var settings = require('../musebridge/settings.js');


var udpPort = new osc.UDPPort({
   localAddress: 'localhost',
   localPort: 51721, // pick one that doesn't conflict

   remoteAddress: settings.oscRelayIpAddress,
   remotePort: settings.oscRelayReceiveUdpPort, // UDP port musebridge is listening on
   metadata: true
});

udpPort.open();

setInterval(function() {
   var msg = messageGenerator.generateMessage();
   console.log('Sending ' + messageGenerator.formatMessage(msg) + ' to ' +  
               udpPort.options.remoteAddress + ':' + udpPort.options.remotePort);
   udpPort.send(msg);
}, 10);
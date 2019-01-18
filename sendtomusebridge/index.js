var osc = require('osc');
var messageGenerator = require('./MessageGenerator');
var settings = require('../musebridge/settings.js');


var udpPort = new osc.UDPPort({
   localAddress: settings.localMachineIp,
   localPort: settings.sendUdpPort,

   remoteAddress: settings.localMachineIp,
   remotePort: settings.receiveUdpPort, // UDP port musebridge is listening on
   metadata: true
});

udpPort.open();

setInterval(function() {
   var msg = messageGenerator.generateMessage();
   console.log('Sending message', msg /*msg.address, msg.args*/, 'to', udpPort.options.remoteAddress + ':' + udpPort.options.remotePort);
   udpPort.send(msg);
}, 1000);
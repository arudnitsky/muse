var osc = require('osc');
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
   var msg = {
      address: '/hello/from/oscjs',
      args: [
         {
            type: 'f',
            value: Math.random()
         },
         {
            type: 'f',
            value: Math.random()
         }
      ]
   };

   console.log('Sending message', msg.address, msg.args, 'to', udpPort.options.remoteAddress + ':' + udpPort.options.remotePort);
   udpPort.send(msg);
}, 1000);
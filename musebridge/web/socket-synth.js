var example = example || {};

(function() {
   'use strict';

   example.SocketSynth = function() {
      this.oscPort = new osc.WebSocketPort({
         url: 'ws://localhost:8081'
      });

      this.listen();
      this.oscPort.open();

      this.oscPort.socket.onmessage = function(e) {
         console.log(e);
      };
   };

   example.SocketSynth.prototype.listen = function() {
      this.oscPort.on('message', function(msg) {
         if (msg.address === '/muse/algorithm/concentration') {
            console.log(msg.address);
            console.log(msg.args[0]);
         }
      });
   };     
}());
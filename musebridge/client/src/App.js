import React, { Component } from 'react';
import * as autoBind from 'react-autobind';
import osc from '../node_modules/osc/dist/osc-browser.js';
import './App.css';

class App extends Component {
   constructor(props) {
      super(props);
      autoBind(this);

      this.state = {
         address: 'Hello World!',
         args: [1.2,2.3],
         info: '[1,2,3.4]'
      }

      this.oscSocket = new osc.WebSocketPort({
         url: 'ws://localhost:8081'
      })

      this.listen();
      this.oscSocket.open();

      console.log(this.oscSocket);
   }

   listen() {
      this.oscSocket.on('message', this.receivedMessage);
   }
   
   receivedMessage(msg) {
      console.log('App OSC message address: ' + msg.address);
      this.setState({ address: msg.address, args: msg.args, info: JSON.stringify(msg.args) });

         // if (msg.address === '/muse/algorithm/concentration') {
         //    console.log('App OSC message address: ' + msg.address);
         //    console.log(msg.args[0]);
         //    this.setState({ address: msg.address });
      // }
   }

   render() {
      return (
         <div className="App">
            <div className="App-message">
               <p>message: {this.state.address}</p>
               <p>params: {this.state.args}</p>
               <p>info: {this.state.info}</p>
            </div>
         </div>
      );
   }
}

export default App;

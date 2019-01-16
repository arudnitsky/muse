import React, { Component } from 'react';
import * as autoBind from 'react-autobind';
import osc from '../node_modules/osc/dist/osc-browser.js';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
   constructor(props) {
      super(props);
      autoBind(this);

      this.state = {
         address: 'Hello World!',
         args: []
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
      this.setState({ address: msg.address, args: msg.args });

         // if (msg.address === '/muse/algorithm/concentration') {
         //    console.log('App OSC message address: ' + msg.address);
         //    console.log(msg.args[0]);
         //    this.setState({ address: msg.address });
      // }
   }

   render() {
      return (
         <div className="App">
            <header className="App-header">
               {/* <img src={logo} className="App-logo" alt="logo" />
               <p>
                  Edit <code>src/App.js</code> and save to reload.
               </p>
               <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
               >
               Learn React
               </a> */}

               <div className="App-message">
                  message {this.state.address}
                  params {this.state.args}
               </div>
            </header>
         </div>
      );
   }
}

export default App;

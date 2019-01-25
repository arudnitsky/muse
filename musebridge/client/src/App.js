import React, { Component } from 'react';
import * as autoBind from 'react-autobind';
import osc from '../node_modules/osc/dist/osc-browser.js';
import './App.css';

import {XYPlot, XAxis, HorizontalGridLines, VerticalBarSeries, /*VerticalBarSeriesCanvas*/} from 'react-vis';

const eegData = [{ x: 'Delta', y: 0 }, { x: 'Theta', y: 0 }, { x: 'Alpha', y: 0 }, { x: 'Beta', y: 0 }, { x: 'Gamma', y: 0 }];

class App extends Component {
   constructor(props) {
      super(props);
      autoBind(this);

      this.state = {
         data: eegData
      }

      // Connect a WebSocket to the OSC relay
      const oscRelayIpAddress = '127.0.0.1'; // The IP address the relay is relaying OSC to. 
      const oscRelayWebSocketPort = '8081';
      var webSocketConnectionString = 'ws://' + oscRelayIpAddress + ':' + oscRelayWebSocketPort
      
      this.oscSocket = new osc.WebSocketPort({
         url: webSocketConnectionString
      })

      this.listen();
      this.oscSocket.open();
      // console.log(this.oscSocket);
      console.log('Connected to ' + webSocketConnectionString);
   }

   listen() {
      this.oscSocket.on('message', this.receivedMessage);
   }
   
   receivedMessage(msg) {
      var hasData = false;

      if (msg.address === '/muse/elements/delta_absolute') {
         eegData[0].y = msg.args[0];
         hasData = true;
      }
      else if (msg.address === '/muse/elements/theta_absolute') {
         eegData[1].y = msg.args[0];
         hasData = true;
      }
      else if (msg.address === '/muse/elements/alpha_absolute') {
         eegData[2].y = msg.args[0];
         hasData = true;
      }
      else if (msg.address === '/muse/elements/beta_absolute') {
         eegData[3].y = msg.args[0];
         hasData = true;
      }
      else if (msg.address === '/muse/elements/gamma_absolute') {
         eegData[4].y = msg.args[0];
         hasData = true;
      }

      if (hasData) {
         // console.log('App OSC message address: ' + msg.address);
         // console.log(msg.args[0]);
         // this.setState({ address: msg.address, args: msg.args, info: JSON.stringify(msg.args), data: eegData });
         this.setState({ address: msg.address });
      }
   }

   render() {
      const {data} = this.state;
      // const BarSeries = VerticalBarSeriesCanvas;   // Canvas
      const BarSeries = VerticalBarSeries;         // SVG
      return (
         <div className="App">
            <div>
               <XYPlot xType="ordinal" width={300} height={300} yDomain={[-1,1]}>
                  <HorizontalGridLines />
                  <XAxis />
                  <BarSeries className="vertical-bar-series-example" data={[data[0]]} />
                  <BarSeries className="vertical-bar-series-example" data={[data[1]]} />
                  <BarSeries className="vertical-bar-series-example" data={[data[2]]} />
                  <BarSeries className="vertical-bar-series-example" data={[data[3]]} />
                  <BarSeries className="vertical-bar-series-example" data={[data[4]]} />
               </XYPlot>
            </div>
         </div>
      );
   }
}

export default App;

# MuseBridge/client
Web site served up by MuseBridge

1. cd musebridge/client
2. yarn
3. Edit ```node_modules/osc/dist/osc-browser.js``` and change 2 instances of '../osc.js' to './osc.js'
4. yarn build

# MuseBridge
Listens for OSC packets from Muse Monitor on iPhone and forwards them to 
on a WebSocket to an application it also hosts.

1. cd musebridge
2. yarn
3. Edit settings.js and set the correct IP address
4. node .

# SendToMuseBridge
Sends OSC test packets to MuseBridge

1. cd sendtomusebridge
2. yarn
3. node .
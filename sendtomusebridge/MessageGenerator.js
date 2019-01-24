'use strict';

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomFloatInRange() {
   return Math.random() * 2 - 1;
};

var messages = [
   '/muse/elements/alpha_absolute',
   '/muse/elements/beta_absolute',
   '/muse/elements/delta_absolute',
   '/muse/elements/theta_absolute',
   '/muse/elements/gamma_absolute'
];

function getRandomMessage() {
   return [
      '/muse/elements/alpha_absolute',
      '/muse/elements/beta_absolute',
      '/muse/elements/delta_absolute',
      '/muse/elements/theta_absolute',
      '/muse/elements/gamma_absolute'
   ][getRandomInt(0, messages.length-1)];
}

function generateFourSensorMessage() {
   return {
      address: getRandomMessage(),
      args: [
         {
            type: 'f',
            value: Math.random()
         },
         {
            type: 'f',
            value: Math.random()
         },
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
};

function generateSingleSensorMessage() {
   return {
      address: getRandomMessage(),
      args: [
         {
            type: 'f',
            value: getRandomFloatInRange()
         }
      ]
   };
};

module.exports = {
   generateMessage: generateSingleSensorMessage
};
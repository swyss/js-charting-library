// jest.setup.js
const {TextEncoder, TextDecoder} = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Load the canvas package
const {createCanvas} = require('canvas');

// Mock the canvas creation
Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
    value: function (contextType) {
        if (contextType === '2d') {
            return createCanvas(this.width, this.height).getContext('2d');
        }
    },
});

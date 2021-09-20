import { io } from 'socket.io-client';

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = "Hello Foo WebPack TypeScript"

    return element;
}

document.body.appendChild(component());

var socket = io();
console.log('FOO')
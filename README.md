# socket.io-emitter-middleware
Redux middleware to emit actions to a socket.io server

## API
### Apply middleware
```javascript
import io from 'socket.io-client';
import { createStore, applyMiddleware } from 'redux';

import socketIOEmitterMiddleware from 'socket.io-emitter-middleware';

import reducer from './reducer';

const socket = io.connect(process.env.SOCKET_URL);

const store = createStore(reducer, applyMiddleware(
  socketIOEmitterMiddleware(socket)
));
```
* `socketIOEmitterMiddleware` receive a `socket` instance created by `io.connect(<url>)`.

### Example action
```javascript
const action = {
  type: 'JOIN_GAME',
  payload: {
    username: username
  },
  socket: {
    send: {
      channel: '/game',
      namespace: 'ns',
      room: 'room'
    }
  }
};
```
* `payload` (optional) is the data passed to the socket.io server.
* `socket.channel` define the socket.io channel to use to emit the action.
* `socket.namespace` (optional) use the given namespace, instead of the default, to emit the action.
* `socket.room` (optional) emit the action to the given room, instead of a global broadcast.

## Installation

```
npm i socket.io-emitter-middleware
```
import test from 'tape';
import socketIOEmitterMiddleware from '../build/index';

function next(action) { return action; }

function mockSocket(t, expected) {
  const emit = (channel, data) => {
    if (expected.channel) {
      t.equals(channel, expected.channel, `it should have the channel "${expected.channel}"`);
    }
    if (expected.action) {
      t.deepEquals(data, expected.action, 'it should have the action as data');
    }
  };

  const to = room => {
    if (expected.room) {
      t.equals(room, expected.room, `it should have the room "${expected.room}"`);
    }
    return { emit };
  };

  const of = namespace => {
    if (expected.namespace) {
      t.equals(namespace, expected.namespace,
        `it should have the namespace "${expected.namespace}"`);
    }
    return { to, emit };
  };

  return { of, to, emit };
}

test('socket.io middleware', t => {
  t.plan(1);

  const testAction = {
    type: 'ADD_NEW',
    payload: 'hello world!',
    socket: {
      channel: 'add:new',
    },
  };

  const socket = mockSocket(t, {
    channel: 'add:new',
    action: testAction,
  });

  const action = socketIOEmitterMiddleware(socket)()(next)(testAction);
  t.deepEquals(action, testAction, 'it should the return the passed action');
});

test('socket.io middleware with namespace', t => {
  t.plan(1);

  const testAction = {
    type: 'ADD_NEW',
    payload: 'hello world!',
    socket: {
      channel: 'add:new',
      namespace: 'test:ns',
    },
  };

  const socket = mockSocket(t, {
    channel: 'add:new',
    action: testAction,
    namespace: 'test:ns',
  });

  const action = socketIOEmitterMiddleware(socket)()(next)(testAction);
  t.deepEquals(action, testAction, 'it should return the passed action');
});

test('socket.io middleware with namespace and room', t => {
  t.plan(1);

  const testAction = {
    type: 'ADD_NEW',
    payload: 'hello world!',
    socket: {
      channel: 'add:new',
      namespace: 'test:ns',
      room: 'test:room',
    },
  };

  const socket = mockSocket(t, {
    channel: 'add:new',
    action: testAction,
    namespace: 'test:ns',
    room: 'test:room',
  });

  const action = socketIOEmitterMiddleware(socket)()(next)(testAction);
  t.deepEquals(action, testAction, 'it should return the passed action');
});

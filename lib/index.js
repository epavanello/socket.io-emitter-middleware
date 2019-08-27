const socketIOEmitterMiddleware = socket => () => next => action => {
  if (action.socket && action.socket.send && action.socket.send.channel) {
    let io = socket;
    if (action.socket.namespace) {
      io = io.of(action.socket.namespace);
    }
    if (action.socket.room) {
      io = io.to(action.socket.room);
    }
    io.emit(action.socket.send.channel, action.payload);
  }
  return next(action);
};

export default socketIOEmitterMiddleware;

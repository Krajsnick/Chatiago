var express = require('express'),
    app = express(),
    server = app.listen(3000),
    io = require('socket.io').listen(server),
    logger = require('morgan'),
    validator = require('validator');

if (process.env.NODE_ENV == 'production') {
  app.use(logger('short'));
  io.set('log level', 1);
}

if (process.env.NODE_ENV == 'development') {
  app.use(logger('dev'));
}

app.use(express.static(__dirname + '/public'));

var connectedNames = [];

io.sockets.on('connection', function(socket) {

  socket.on('msg-received', function(msgData) {
    msgData.name = validator.escape(msgData.name);
    msgData.message = validator.escape(msgData.message);
    console.log('Message received from client:\n' + msgData.name+': ' + msgData.message);
    io.sockets.emit('update-chat', msgData);
  });

  socket.on('set-name', function(data) {
    data = validator.escape(data);
    socket.set('name', data, function() {
      connectedNames.push(data);
      console.log("Entered name: " + data);
      io.sockets.emit('new-user-connected', connectedNames);
    });
  });

  socket.on('disconnect', function() {
    socket.get('name', function(err, name) {
      var index = connectedNames.indexOf(name);
      connectedNames.splice(index, 1);
      io.sockets.emit('new-user-connected', connectedNames);
    });
  });

});

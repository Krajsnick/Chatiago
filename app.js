var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    logger = require('morgan'),
    validator = require('validator'),
    db = require('./db');

server.listen(process.env.PORT || 3000);

if (process.env.NODE_ENV == 'production') {
  app.enable('trust proxy')
  app.use(logger('combined'));
  io.set('log level', 1);
} else {
  app.use(logger('dev'));
}

app.use(express.static(__dirname + '/public'));

var connectedNames = {};

io.sockets.on('connection', function(socket) {

  db.getCurrentChat(function(data) {
    socket.emit('update-chat', data);
  })

  socket.on('msg-received', function(message) {
    message = validator.escape(message);
    var data = {name: connectedNames[socket.id], message: message};
    io.sockets.emit('update-chat', data);
    db.saveMessage(data);
  });

  socket.on('set-name', function(data) {
    data = validator.escape(data);
    socket.set('name', data, function() {
      connectedNames[socket.id] = data;
      io.sockets.emit('new-user-connected', getValues(connectedNames));
    });
  });

  socket.on('disconnect', function() {
    socket.get('name', function(err, name) {
      delete connectedNames[socket.id];
      io.sockets.emit('new-user-connected', getValues(connectedNames));
    });
  });

});

function getValues(obj) {
  return Object.keys(obj).map(function(key) {return obj[key];});
}

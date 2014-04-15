var express = require('express'),
    app = express(),
    server = app.listen(3000),
    io = require('socket.io').listen(server),
    logger = require('morgan');

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));


io.sockets.on('connection', function(socket) {

  socket.on('msg-received', function(msgData) {
    console.log('Message received from client:\n' + msgData.name+': ' + msgData.message);
    io.sockets.emit('update-chat', msgData);
  });

});

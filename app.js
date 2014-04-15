var express = require('express'),
    app = express(),
    server = app.listen(3000),
    io = require('socket.io').listen(server),
    logger = require('morgan');

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

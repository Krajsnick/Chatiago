var express = require('express');
var app = express();
var logger = require('morgan');

app.listen(3000);

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

var express = require('express');
var app = express();

app.listen(3000);

app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});

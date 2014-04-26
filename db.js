var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/chatiago', function(err) {
  if (err) console.error("Could not connect to database");
});

var DB.Chat = mongoose.model('Chat', {
  name: String,
  message: String
});

var DB.getCurrentChat = function(callback) {
  db.Chat.find().
  sort({_id: -1}).
  limit(10).
  exec(function(err, docs) {
    if (err) throw err;
    callback(docs);
  });
};

var DB.saveMessage = function(doc) {
  var chatMessage = new DB.Chat({
    name: chatMessage.name,
    message: chatMessage.message
  });

  chatMessage.save(function(err) {if (err) throw err});
};

module.exports = DB;

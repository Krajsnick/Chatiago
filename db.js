var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/chatiago', function(err) {
  if (err) console.error("Could not connect to database");
});

var DB = {
  Chat: mongoose.model('Chat', {
    name: String,
    message: String
  }),

  getCurrentChat: function(callback) {
    this.Chat.find().
    limit(200).
    exec(function(err, docs) {
      if (err) throw err;
      callback(docs);
    });
  },

  saveMessage: function(doc) {
    var chatMessage = new DB.Chat({
      name: doc.name,
      message: doc.message
    });

    chatMessage.save(function(err) {if (err) throw err});
  }
}

module.exports = DB;

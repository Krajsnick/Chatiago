var ws = io.connect(window.location.origin);

$('#chat-message').keypress(function(e) {
  if (e.keyCode == 13) {
    console.log("Chat message sent");
    var message = $(this).val();

    ws.emit('msg-received', {name: 'Robert', message: message});

    $(this).val('');
  }
});

ws.on('update-chat', function(msgData) {
  var htmlMsg = "<b>" + msgData.name + ":</b> " + msgData.message + "<br />";
  $('#chat').append(htmlMsg);
});

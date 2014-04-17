var ws = io.connect(window.location.origin),
    $chat = $('#chat');

$('#chat-name').focus();

if ($('#chat-name').keypress(function(e) {
  if (($('#chat-name').val() != "") && e.keyCode == 13) {
    nickname = $('#chat-name').val();
    $('#chat-name-row').fadeOut('fast', function() {
      $('#chat-row, #chat-message').fadeIn('slow', function(completion) {
        $('#chat-message').focus();
      });
    });
    ws.emit('set-name', nickname);
  }
}));

$('#chat-message').keypress(function(e) {
  if (e.keyCode == 13) {
    console.log("Chat message sent");
    var message = $(this).val();

    ws.emit('msg-received', {name: nickname, message: message});

    $(this).val('');
  }
});

ws.on('update-chat', function(msgData) {
  var htmlMsg = "<b>" + msgData.name + ":</b> " + msgData.message + "<br />";
  $chat.append(htmlMsg).scrollTop($chat[0].scrollHeight);
});

ws.on('new-user-connected', function(data) {
  var userLiHtml = "";

  data.forEach(function(name) {
    userLiHtml += "<li>" + name + "</li>";
  });

  $('#user-list ul').html(userLiHtml);
});

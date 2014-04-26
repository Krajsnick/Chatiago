var ws = io.connect(window.location.origin),
    $chat = $('#chat');

$('#chat-name').focus();

if ($('#chat-name').keypress(function(e) {
  if (($('#chat-name').val() != "") && e.keyCode == 13) {
    nickname = $('#chat-name').val();
    $('#chat-name-row').fadeOut('fast', function() {
      $('#chat-row, #chat-message-row').fadeIn('slow', function(completion) {
        scrollChatToBottom();
        $('#chat-message').focus();
      });
    });
    ws.emit('set-name', nickname);
  }
}));

$('#chat-message').keypress(function(e) {
  if (e.keyCode == 13) {
    var message = $(this).val();

    ws.emit('msg-received', message);

    $(this).val('');
  }
});

ws.on('update-chat', function(msgData) {
  if (msgData instanceof Array) {
    var htmlMsg = "";
    msgData.forEach(function(msg) {
      htmlMsg += "<b>" + msg.name + ":</b> " + msg.message + "<br />";
    });
  } else {
    var htmlMsg = "<b>" + msgData.name + ":</b> " + msgData.message + "<br />";
  }
  $chat.append(htmlMsg)
  scrollChatToBottom();
});

ws.on('new-user-connected', function(data) {
  var userLiHtml = "";

  data.forEach(function(name) {
    userLiHtml += "<li>" + name + "</li>";
  });

  $('#user-list ul').html(userLiHtml);
});

function scrollChatToBottom() {
  $chat.scrollTop($chat[0].scrollHeight);
}

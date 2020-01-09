function chatRun()
{
    //connects to socket
    var socket = io();
    //ref to the div message form
    var $messageForm = $('#messageForm');
    //ref to input box with id message
    var $messageInput = $('#messageInput');
    //ref to div chat
    var $chat = $('#chat');

    //var test = $messageInput.val('');
    var $people = $('#people');

    $messageForm.submit(function (e) {
        e.preventDefault();
        socket.emit('Send a message', $('#messageInput').val());
        $('#messageInput').val('');
        return false;
    });
};
$(function () {
   
    var socket = io(); //connects to socket

    var $messageForm = $('#messageForm');///////////////////////////
    
    var $chat = $('#chat');  //Messages area
    var $window = $(window);

    //var $usernameInput = $('.usernameInput'); //Input for username
    
    //var $messages = $('#messages');

    //var $loginPage = $('#loginPage');//////////////////////////////
    //Timers for typing notification (in milliseconds)
    //var FADE_TIME = 150;/////////////////////////////////////////////
    //var TYPING_TIMER_LENGTH = 400;///////////////////////////////////

    //Username setings
    //var username;


    
    
    
    const cleanInput = (input) =>
    {
        return $('<div/>').text(input).html();
    }
    
    $messageForm.submit((e) =>
    {
        message = document.getElementById("messageInput").value;
        if (message.length != null) {
            e.preventDefault();
            socket.emit('Send a message', message);
            $chat.append('<br>' + '<div id="circle">' + '<textarea id="t" readonly>' + message + '</textarea>' + '</div>' + '<br>');
        }
        message = cleanInput(message);
    });

    //socket.on('new message', (data) =>
    //{
    //    if (message.length > 0)
    //    {
    //        socket.emit('new message', message);
    //        $chat.append('<br>' + '<div id="circle">' + '<textarea id="t" readonly>' + message + '</textarea>' + '</div>' + '<br>');
    //    }
    //    else if (true)
    //    {

    //    }
    //});

    //When a new user joins the chat - this is shown in the chat
    socket.on('user joined', (data) => {
        log(data.username + " joined the chat");
        $chat.append($('<br>' + "A user has joined" + '<br>'));

    });
    //When a user leaves the chat - this is shown in the chat
    socket.on('user left', (data) => {
        log(data.username + " left the chat");
        $chat.append($('<br>' + "User has left the chat" + '<br>'));
    });




    //socket.on('disconnect', () => {
    //    log("you have been disconnected, goodbye!");
    //    console.log("you have been disconnected, goodbye!");
    //});


        ////When a new message is emitted by the server - the chat is updated
    //socket.on('new message', () => {
    //    $chat.append($('<br>' + message + '<br>'));
    //});


       //const sendMessage = (data) => {

    //    
    //    socket.emit('new message', message);
    //    $chat.append($('<li>') + '<div id="circle">' + '</div>' + data.message + '<br>');
    //}


    //var connected = false;
    //var typing = false;//////////////////////////////////////////
    //var lastTypingTime;

    //Function for when users join the chat
    //const addUserMessage = (data) =>
    //{
    //    var message = '';
    //    if (data.onlineUsers === 1) {
    //        message += "There is  another User online";
    //        console.log("IS TYPING");
    //    }
    //    else
    //    {
    //        message += "There are " + data.onlineUsers + " Users online"
    //        console.log("USER ONLINE" + data);
    //    }
    //    log(message);
    //}
    //Setting Usernames
    //const setUsername = () =>
    //{
    //    username = cleanInput($usernameInput.val().trim());
    //    //If username is valid
    //    if (username)
    //    {
    //        //$loginPage.fadeOut();/////////////////////////////
    //        $messages.show();
    //        //$loginPage.off('click');////////////////////////////////
    //        $currentInput = $messageInput;

    //        socket.emit('add user', username);
    //    }
    //}

    //Message Log
    //const log = (message, options) =>
    //{
    //    var $messageElement = $('<li>').addClass('log').text(message);
    //    addMessageElement($messageElement, options);////////////////////////////////////////////////////////////////////////////////////
    //    console.log("element added to log")
    //}

    //const addChatMessage = (data, options) =>
    //{
    //    var $typingMessages = getTypingMessage(data);
    //    options = options || {};
    //    if ($typingMessages.length !== 0)
    //    {
    //        options.fade = false;
    //        $typingMessages.remove();
    //    }

    //    var $usernameDiv = $('<span class="username"/>').text(data.username);
    //    var $messageBodyDiv = $('<span class="messageBody">').text(data.message);

    //    var typingClass = data.typing ? 'typing' : '';
    //    var $messageDiv = $('<li class="message"/>').data('username', data.username).addClass(typingClass).append($usernameDiv, $messageBodyDiv);

    //    addMessageElement($messageDiv, options);
    //}

    ////Add the 'chat typing' message//////////////////////////////////////////
    //const addChatTyping = (data) => {
    //    data.typing = true;
    //    data.mesage = 'is typing';
    //    addChatMessage(data);
    //    console.log("IS TYPING");
    //}

    //const removeChatTyping = (data) => {
    //    getTypingMessages(data).fadeOut(function () {
    //        $(this).remove();
    //    });
    //}

    //const addMessageElement = (messageElement, options) =>
    //{
    //    var $messageElement = $(messageElement);
    //    //Default Options
    //    if (!options) {
    //        options = {};
    //    }
    //    //Fade out
    //    if (typeof options.fade === 'undefined') {
    //        options.fade = true;
    //    }
    //    //Add to start
    //    if (typeof options.prepend === 'undefined') {
    //        options.prepend = false;
    //    }

    //    //Applying the options
    //    if (options.fade) {
    //        $messageElement.hide().fadeIn(FADE_TIME);
    //    }
    //    if (options.prepend) {
    //        $messages.prepend($messageElement);
    //    }
    //    else {
    //        $messages.prepend($messageElement);
    //    }
    //    $messages[0].scrollTop = $messages[0].scrollHeight;
    //}


    //Prevents input from injected markup by clearing input before use///////////////////////////////
   
    //Updating typing event/////////////////////////////////////////////////////
    //const updateTyping = () =>
    //{
    //    if (connected)
    //    {
    //        if (!typing)
    //        {
    //            typing = true;
    //            socket.emit('typing');
    //        }
    //        lastTypingTime = (new Date()).getTime();

    //        setTimeout(() =>
    //        {
    //            var typingTimer = (new Date()).getTime();
    //            var timeDifference = typingTimer - lastTypingTime;

    //            if (timeDifference >= TYPING_TIMER_LENGTH && typing)
    //            {
    //                socket.emit('stop typing');
    //                typing = false;
    //            }
    //        }, TYPING_TIMER_LENGTH);//////////////////////////////////////////////
    //    }
    //}




    //$window.keydown(event =>
    //{
    //    // When the client hits ENTER on their keyboard
    //    if (event.enter === 13) {
    //        if ($messageInput == null) {
    //            sendMessage();
    //            //socket.emit('stop typing');
    //            typing = false;
    //            console.log($messageInput);
    //        }
    //        else
    //        {
    //            $chat.append('<br>' + '<div id="circle">' + "You can't do that right now" + '</div>' + '<br>');
    //            console.log("Cannot output a blank message!")
    //        }
    //    }
    //});



    //Getting the notification that someone is typing
    //const getTypingMessages = (data) =>
    //{
    //    return $('.typing.message').filter(function (i)
    //    {
    //        return $(this).data('username') === data.username;//////////////////////////////////////////////
    //    });
    //}
    //If there's an input, run updateTyping function
    //$messageInput.on('input', () =>
    //{
    //    updateTyping();
    //});
    /////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////
    //Mouse Click Events//
    //////////////////////

    //Clicking the input box focuses it
    
    ////////////////////////
    //Server Output Events//
    ////////////////////////

    // When a login process has been processed, output to chat with message
    //socket.on('login', (data) => {
    //    connected = true;

    //    var message = "Welcome to the Game Review Chat Room - ";
    //    log(message,
    //        {
    //            prepend: true
    //        });
    //    addUserMessage(data);
    //});
 
    ////When someone is typing and the server emits that they are
    //socket.on('typing', (data) => {
    //    addChatTyping(data);
    //});
    //When someone stop typing and the server emits that they stopped
    //socket.on('stop typing', (data) => {
    //    removeChatTyping(data);
    //});

   
// temp finisher///////////////////////////////////////////////////////////////////////////////////////////////////////

    //    //Log of user messages
    //    showlog = false;
    //    window.setInterval(function () {
    //        if (showlog == false) {
    //            var chat = document.getElementById('chat');
    //            chat.scrollTop = chat.scrollHeight;

    //            var people = document.getElementById('people');
    //            people.scrollTop = people.scrollHeight;
    //        }
    //    }, 4);
    

});
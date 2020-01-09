//Important require statements
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
//Specify the port of use
var port = 9000;
// Initialise socket.io
var io = require('socket.io')(http);

//Specify the use of the webpage folder
app.use(express.static(path.join(__dirname, 'webpages')));


//Server listening
http.listen(port, function ()
{
	console.log("Chat Web Server is online using port: " + port);
});

//Users connected in chat room
var onlineUsers = [];
var UserConnections = [];

//On Connecting to the client
io.on('connection', (socket) =>
{
	UserConnections.push(socket);
	io.sockets.emit('new user');
	//connection stuff
	console.log("Users Connected: ", UserConnections.length);

	// disconnection stuff
	socket.on('disconnect', () => {
		onlineUsers.splice(onlineUsers.indexOf(socket.username), 1);
		UserConnections.splice(UserConnections.indexOf(socket), 1);
		io.sockets.emit('user left');
		console.log("User disconnected: ", UserConnections.length, "Left in chat");
	});

	//send messages
	socket.on('Send a message', (message) => {
		console.log('Message reads: ' + message);// shows what the users typed in console
		io.emit('new message', { msg: message }); // Outputs to socket
	});


	////new message sent by client
	//socket.on('new message', (data) =>
	//{
	//	console.log(data);

	//	io.sockets.emit('new message',
	//		{
	//			username: socket.username,
	//			message: data
	//		});
	//});
	//Adding user and then smitting they joined - from client
	//socket.on('add user', (username) =>
	//{
	//	if (UserAdded)
	//	{
	//		return;
	//	}
	//	//username stored in the socket
	//	socket.username = username;
	//	onlineUsers++;
	//	UserAdded = true;
	//	socket.emit('login',
	//		{
	//			onlineUsers: onlineUsers
	//		});
	//	socket.broadcast.emit('user joined',
	//		{
	//			username: socket.username,
	//			onlineUsers: onlineUsers
	//		});
	//	console.log("User " + username + " has joined the chat")
	//});
	//On user stop typing
	//socket.on('stop typing', () =>
	//{
	//	socket.broadcast.emit('stop typing',
	//		{
	//			username: socket.username
	//		});
	//});



});


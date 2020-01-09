'use strict';
var express = require('express');
var app = express();
var http = require('http').createServer(app);
//Specify the port of use
var port = 9000;
// Initialise socket.io
var io = require('socket.io')(http);

//Specify the use of the webpage folder

app.use(express.static('webpages'));


//app.get('/', function (req, res) {
//	res.sendFile(__dirname + '/index.html');
//});


//setting the required variables
var users = []; //users array
var onlineConnections = []; //connections array

//Server listening
http.listen(port, function () {
	console.log("Chat Web Server is online using port: " + port);
});

io.on('connection', function (socket) {
	//connection stuff
	onlineConnections.push(socket);
	console.log("Users Connected: ", onlineConnections.length, "Welcome new user!");

	socket.emit("message",
		{
			text: "Welcome to the T-Pose Chat Room!",
		});


	// disconnection stuff
	socket.on("disconnect", function () {
		users.splice(users.indexOf(socket.username), 1); //accessing the array "users"

		onlineConnections.splice(onlineConnections.indexOf(socket), 1);
		console.log("User disconnected: ", onlineConnections.length, " left in chat");
	});

	//send messages
	socket.on('Send a message', function (msg) {
		console.log('Message reads: ' + msg);// shows what the users typed in console
		io.emit('new message', msg); // Outputs to socket
	});
});


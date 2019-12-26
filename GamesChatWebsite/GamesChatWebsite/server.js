'use strict';
var http = require('http');
var express = require("express");
//Specify the port of use
var port = 9000;
// Initialise the Express app.
var app = express();
//Initialisation of server
server = http.createServer(app);
// Initialise a HTTP server


var io = require("socket.io").listen(server);

//setting the required variables
var users = []; //users array
var onlineConnections = []; //connections array

var server = http.createServer(function (request, response)
{
	response.writeHead(200,
		{
		'Content-Type': 'text/plain',
		"Access-Control-Allow-Origin": "*"
		});
	//response.end('Hello World\n');
	
});
//Server listening
server.listen(port, function ()
{
	console.log("Chat Web Server is online");
});

app.get("/", function (request, response) {
	response.sendFile("./GamesChatWebsite/webpages/ChatPage.html"); //links to html file
});




io.sockets.on("connection", function (socket)
{
	//connection stuff
	onlineConnections.push(socket);
	console.log("Users Connected: %s", onlineConnections.length);

	// disconnection stuff
	socket.on("disconnect", function (data)
	{
		users.splice(users.indexOf(socket.username), 1); //accessing the array 'users'

		onlineConnections.splice(onlineConnections.indexOf(socket), 1);
		console.log("Users disconnected: %s ", onlineConnections.length);
	});

	//send messages
	socket.on("Send a message", function (data)
	{
		console.log(data);// shows what the users typed in console
		io.sockets.emit("new message", { msg: data });
	});
});


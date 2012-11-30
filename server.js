var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(process.env.PORT || 4455 );

function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
	}

		res.writeHead(200);
		res.end(data);
	});
}

// assuming io is the Socket.IO server object
//io.configure(function () { 
//	io.set("transports", ["xhr-polling"]); 
//	io.set("polling duration", 10); 
//});

io.sockets.on('connection', function (socket) {
	socket.on('reciever', function (data) {
		console.log(data);
		socket.broadcast.emit('message', { msg: data.msg, style: data.style, delay: data.delay });
	});
});
const io = require("socket.io")(3000);

users = 0;

io.on('connection', socket => {
	console.log(`New User: ${users}`);
	users++;
	//socket.emit('message-event', 'Hello There!');
	socket.on('send-message', message => {
		console.log(`New Message: ${message}`);
		socket.broadcast.emit('message-event', message);
	});
});

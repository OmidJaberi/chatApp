const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

let usercount = 0;
const users = [];
const online = {};



io.on('connection', socket => {
	//socket.emit('message-event', 'Hello There!');
	socket.on('add-user', token => {
		online[this] = token;
		console.log(`New User: ${usercount} - ${token}`);
		usercount++;
	});
	socket.on('send-message', data => {
		console.log(`New Message: ${data.message} from ${data.token}`);
		socket.broadcast.emit('message-event', {
			'from': data.token,
			'message': data.message
		});
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});


app.get('/users', (req, res) => {
  res.json(users);
})

app.post('/users', async (req, res) => {
	console.log(`new user: ${ req.body.name}`)
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = { name: req.body.name, password: hashedPassword };
		users.push(user);
		res.status(201).send();
	} catch {
		res.status(500).send();
	}
})
  

app.post('/users/login', async (req, res) => {
	const user = users.find(user => user.name === req.body.name);
	if (user == null) {
		return res.status(400).send({
			'msg': 'Cannot find user'
		});
	}
	try {
		if(await bcrypt.compare(req.body.password, user.password)) {
			res.send({
				'msg': 'Success',
				'token': user.name
			});
		}
		else {
			res.send({
				'msg': 'Password is not correct.'
			});
		}
	} catch {
		res.status(500).send()
	}
})
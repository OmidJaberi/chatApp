const express = require('express');
const http = require('http');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

const users = [];
const online = {};

io.on('connection', socket => {
	socket.on('add-user', token => {
		online[token] = socket;
		console.log(`New User: ${token}`);
	});
	socket.on('send-message', data => {
		console.log(`New Message: ${data.message} from ${data.token} to ${data.to}`);
		if (online[data.to])
			online[data.to].emit('message-event', {
				'from': data.token,
				'message': data.message,
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
		if (await bcrypt.compare(req.body.password, user.password)) {
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
		res.status(500).send();
	}
})
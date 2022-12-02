import './style.css';

let socket;
let token;
const username = document.getElementById('user');
const password = document.getElementById('pass');
const newUsername = document.getElementById('new-user');
const newPassword = document.getElementById('new-pass');
const signupContainer = document.getElementById('signup-container');
const loginContainer = document.getElementById('login-container');
const senderContainer = document.getElementById('send-container');
const newMessage = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

function addMessage(message, sender) {
  const tag = `${sender != token ?  sender + ':' : ''} <div>
    <div class="message${sender == token ? ' me' : ''}">${message}</div>
  </div>`;
  messageContainer.innerHTML += tag;
  window.scrollTo(0,document.body.scrollHeight);
}

signupContainer.onsubmit = async e => {
  e.preventDefault();
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newUsername.value,
      password: newPassword.value
    })
  })
    .then(res =>  {
      if (res.status === 201) {
        alert('User created');
        document.getElementById('signupcover').style.display = 'none';
      }
      else {
        alert(`Error status: ${res.status}.`);
      }
    })
    .catch(err => console.log(err));
}


loginContainer.onsubmit = async e => {
  e.preventDefault();
  fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: username.value,
      password: password.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg === 'Success') {
        token = data.token;
        document.getElementById('cover').style.display = 'none';
        socket = io('http://localhost:3000', { transports : ['websocket'] });
        socket.emit('add-user', token);
        socket.on('message-event', data => {
          addMessage(data.message, data.from);
        });
      }
      else {
        alert(data.msg);
      }
    })
    .catch(err => console.log(err));
}

senderContainer.onsubmit = e => {
  e.preventDefault();
  const message = newMessage.value;
  if (message != '') {
    addMessage(message, token);
    socket.emit('send-message', {
      'token': token,
      'message': message
    });
  }
  newMessage.value = '';
}

document.getElementById('showSignup').onclick = () => {
  const cover = document.getElementById('signupcover');
  cover.style.display = 'block';
}
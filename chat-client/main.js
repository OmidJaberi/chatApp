import './style.css';

const socket = io('http://localhost:3000', { transports : ['websocket'] });
const senderContainer = document.getElementById('send-container');
const newMessage = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

function addMessage(message, sender='other') {
  const tag = `<div>
    <div class="message${sender == 'me' ? ' me' : ''}">${message}</div>
  </div>`;
  messageContainer.innerHTML += tag;
  window.scrollTo(0,document.body.scrollHeight);
}

socket.on('message-event', data => {
  addMessage(data);
});

senderContainer.onsubmit = e => {
  e.preventDefault();
  const message = newMessage.value;
  if (message != '') {
    addMessage(message, 'me');
    socket.emit('send-message', message);
  }
  newMessage.value = '';
}
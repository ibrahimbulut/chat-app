const socket = io.connect('http://localhost:3000');

const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

submitBtn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        sender: sender.value,
    });
});

//Enter tuşu ile de gönderme işlevi
message.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
     //message.preventDefault();
     document.getElementById('submitBtn').click();
    }
  });
//Gelen mesajları için scroll u hep en altta tutmaya yarayan fonksiyon
function updateScroll(){
    var chatwindow = document.getElementById('chat-window');
    chatwindow.scrollTop = chatwindow.scrollHeight;
}

socket.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>';
    message.value = '';
    updateScroll();
    //setInterval(updateScroll,100);
    //document.getElementById('output').scrollTop = 9999999;
});

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value);
});

socket.on('typing', data => {
    feedback.innerHTML = '<p>' + data + 'yazıyor...</p>';
});

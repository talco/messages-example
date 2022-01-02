const express = require('express');
const app = express();
const http = require('http');
var cors = require('cors')

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const defaultRoom = 'general';
const messages = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.emit("all-messages", messages);
    
    socket.on('add-message', function(message) {
        messages.push(message);
        socket.broadcast.emit('add-message', message);
        console.log('add message:', message);
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router')


const app = express();



const server = http.createServer(app);

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});


const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(router);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room, userId }, callback) => {



    const { error, user } = addUser({ id: userId, socketID: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);
    socket.to(user.room).broadcast.emit('user-connected', user.id)
    socket.emit('message', { user: 'Ajibot', text: `Hi ${user.name}, welcome to the party :)`, type: 'text', privacy: 'public' });

    socket.broadcast.to(user.room).emit('message', { user: 'Ajibot', text: `${user.name} has joined the party 😎`, type: 'text', privacy: 'public' });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();

    socket.on('sendMessage', (message, selectedUser, fileType, callback) => {
      const user = getUser(userId);
      if (selectedUser === 'Everyone') {
        io.to(user.room).emit('message', { user: user.name, text: message, type: fileType, privacy: 'public' });
      } else {
        io.to(selectedUser).to(user.socketID).emit('message', { user: user.name, text: message, type: fileType, privacy: 'private' });
      }
      callback();

    })

    socket.on('sendFile', (file, selectedUser, fileType, fileName, file_extension, callback) => {
      const user = getUser(userId);
      if (selectedUser === 'Everyone') {
        io.to(user.room).emit('message', { user: user.name, text: file, type: fileType, file_extension, privacy: 'public', fileName: fileName });
      } else {
        io.to(selectedUser).to(user.socketID).emit('message', { user: user.name, text: file, type: fileType, file_extension, privacy: 'private', fileName: fileName });
      }
      callback();
    })


    socket.on('sharingScreen', (info) => {
      const user = getUser(userId);
      socket.broadcast.to(user.room).emit('message', { user: 'Ajibot', text: `${user.name} has started sharing the screen`, type: 'text', privacy: 'public' });
      socket.broadcast.to(user.room).emit('info', info);
    })





    socket.on('disconnect', () => {
      const user = removeUser(userId);
      if (user) {
        socket.to(user.room).broadcast.emit('user-disconnected', user.id);
        io.to(user.room).emit('message', { user: 'Ajibot', text: `${user.name} has left the party 😯`, type: 'text', privacy: "public" });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      }


    })
  });
})



server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

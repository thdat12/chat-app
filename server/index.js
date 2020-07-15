const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const socketio = require('socket.io')
const cors = require('cors')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Conencted to Database'))
  .catch(err => console.log(err))

const app = express()

const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(cookieParser())
app.use(cors())

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

  });

  socket.on('sendMessage', (message) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

app.use('/api/user', require('./routes/user'))


const port = process.env.PORT || 5000

server.listen(port, () => console.log(`Server is running on port ${port}`))
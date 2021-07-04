const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001
const app = express()

const server = require('http').createServer(app);
const io = require('socket.io')(server, {});

app.get('/status', (req, res) => {
    res.sendStatus(200)
})

let onlineUser = 0;
let users = [];
let chats = []

io.on('connection', socket =>{
    let profile = {
      id: socket.id,
      name: 'User',
    }

    socket.on('join', (room) => {
      console.log(`Socket ${socket.id} joining ${room}`);
      socket.join(room);

      io.emit('getProfile', profile)

      users.push(profile)
      io.emit('getMember', users)
      
      onlineUser ++
      io.emit('onlineUser', onlineUser)
      // io.emit('onlineUser', users.length)

      io.emit('getChat', chats)
   });

    socket.on('disconnect', () => {
      console.log(`Disconnected: ${socket.id}`)

      users.forEach((element, i) => {
        if(users[i].id === socket.id) {
            users.splice(i,1);
            return false;
        }
      });
      io.emit('getMember', users)

      onlineUser --
      io.emit('onlineUser', onlineUser)
    });

    socket.on('changeProfile', (name) => { 
      profile.name = name     
      users.forEach((user, i) => {
        if(user.id === socket.id){
          users[i].name = name
        }
      });

      chats.forEach((chat, i) => {
        if(chat.id === socket.id){
          chats[i].name = name
        }
      });

      io.emit('getChat', chats)

      io.emit('getMember', users)
    })

    socket.on('chat', (param) => {
      chats.push({id: profile.id, name: profile.name, msg: param})
      
      io.emit('getChat', chats)
    })

    socket.on('clearChat', () => {      
      chats = []
      io.emit('getChat', chats)
    })
})

const publicPath = path.join(__dirname, '../client', 'build');
app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

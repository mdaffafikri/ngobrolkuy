import io from 'socket.io-client';
let socket;

export const initiateSocket = (room) => {
  // socket = io('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] });
  socket = io('http://ngobrolkuy.herokuapp.com/', { transports: ['websocket', 'polling', 'flashsocket'] });
  console.log(`Connecting socket...`);
  if (socket && room) {
    socket.emit('join', room)    
  }
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const getUserProfile = (param) => {
  if (!socket) return(true);
  //subscribe sekali
  socket.once('getProfile', (profile) => {
    return param(null, profile);
  })
}

export const getMember = (param) => {
  if (!socket) return(true);

  socket.on('getMember', (member) => {
    return param(null, member);
  })
}

export const getOnlineUser = (param) => {
  if (!socket) return(true);

  socket.on('onlineUser', userCount => {
    // console.log('Websocket event received!');
    return param(null, userCount);
  });  
}


export const getMessages = ( param ) => {  
  if (!socket) return(true);
  socket.on('getChat', (msg) => {    
    return param(null, msg);
  })
}

export const changeProfile = ( name ) => {
  if(socket) socket.emit('changeProfile', name)
}

export const sendMessage = ( message ) => {
  if (socket) socket.emit('chat', message);
}

export const clearMessage = () => {
  if (socket) socket.emit('clearChat')
}
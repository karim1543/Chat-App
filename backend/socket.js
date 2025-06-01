const { Server } = require('socket.io');

let onlineUsers = new Map();

const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Save userId and socket.id
    socket.on('addUser', (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log('Online Users:', onlineUsers);
    });

    // Join chat room
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
    });

    // Send and receive messages
    socket.on('sendMessage', ({ senderId, receiverId, chatId, text }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      const messageData = { senderId, chatId, text, createdAt: new Date() };

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', messageData);
      }

      // Also emit back to sender to update their chat
      // socket.emit('receiveMessage', messageData);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      [...onlineUsers.entries()].forEach(([userId, sockId]) => {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
        }
      });
    });
  });
};

module.exports = socketServer;
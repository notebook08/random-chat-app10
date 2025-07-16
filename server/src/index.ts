import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5000"],
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AjnabiCam Server is running!');
});

// Store connected users
const connectedUsers = new Map();
const waitingUsers: string[] = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  connectedUsers.set(socket.id, {
    id: socket.id,
    isPremium: false,
    genderFilter: 'any'
  });

  // Handle user profile updates
  socket.on('user:profile', (data) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      connectedUsers.set(socket.id, { ...user, ...data });
    }
  });

  // Handle matching logic
  socket.on('find:match', () => {
    if (waitingUsers.length > 0) {
      const partnerId = waitingUsers.shift();
      if (partnerId && partnerId !== socket.id) {
        // Match found
        socket.emit('user:connect', partnerId);
        io.to(partnerId).emit('user:connect', socket.id);
      }
    } else {
      waitingUsers.push(socket.id);
    }
  });

  // Handle WebRTC signaling
  socket.on('offer', ({ offer, to }) => {
    io.to(to).emit('offer', { offer, from: socket.id });
  });

  socket.on('answer', ({ answer, to }) => {
    io.to(to).emit('answer', { answer, from: socket.id });
  });

  socket.on('ice-candidate', ({ candidate, to }) => {
    io.to(to).emit('ice-candidate', { candidate, from: socket.id });
  });

  // Handle messages
  socket.on('send:message', ({ message, targetChatToken, isSecret, messageId }) => {
    io.to(targetChatToken).emit('message:recieved', {
      message,
      from: socket.id,
      isSecret,
      messageId
    });
  });

  // Handle skip
  socket.on('skip', () => {
    socket.broadcast.emit('skipped');
    // Remove from waiting list if present
    const index = waitingUsers.indexOf(socket.id);
    if (index > -1) {
      waitingUsers.splice(index, 1);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    connectedUsers.delete(socket.id);
    // Remove from waiting list if present
    const index = waitingUsers.indexOf(socket.id);
    if (index > -1) {
      waitingUsers.splice(index, 1);
    }
    // Notify partner if in call
    socket.broadcast.emit('partnerDisconnected');
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
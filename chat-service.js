const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

// שרת HTTP מעל Express
const server = http.createServer(app);

// חיבור Socket.IO לשרת
const io = new Server(server, {
cors: {
origin: '*', // בהמשך נצמצם לדומיין הספציפי
methods: ['GET', 'POST']
}
});

// בדיקת בריאות
app.get('/', (req, res) => {
res.json({ status: 'ok', service: 'chat' });
});

// Middleware לאימות טוקן (פשוט)
io.use((socket, next) => {
const token = socket.handshake.auth && socket.handshake.auth.token;

if (token === 'dummy-token-123') {
return next();
}

return next(new Error('Authentication error'));
});

// לוגיקה של הצ'אט
io.on('connection', (socket) => {
console.log('User connected');

socket.on('message', (msg) => {
console.log('Received message:', msg);
// משדר לכולם
io.emit('message', msg);
});

socket.on('disconnect', () => {
console.log('User disconnected');
});
});

// פורט: מהסביבה (Render) או 3001 בלוקאל
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
console.log(`Chat service running on port ${PORT}`);
});

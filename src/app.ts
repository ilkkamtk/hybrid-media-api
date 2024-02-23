require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';

import {notFound, errorHandler} from './middlewares';
import api from './api';
import {ClientToServerEvents, ServerToClientEvents} from './types/LocalTypes';
import promisePool from './lib/db';
import {MediaItem} from '@sharedTypes/DBTypes';
import {RowDataPacket} from 'mysql2';

const app = express();

app.use(morgan('dev'));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'"],
    },
  })
);
app.use(cors());
app.use(express.json());

// socket.io test
const httpServer = createServer(app).listen(process.env.SOCKET_PORT || 3004);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: '*',
  },
});

let lastRowCount = 0;

setInterval(async () => {
  const [rows] = await promisePool.execute<MediaItem[] & RowDataPacket[]>(
    'SELECT COUNT(*) as count FROM MediaItems'
  );
  const currentRowCount = rows[0].count;
  console.log('interval', currentRowCount, lastRowCount);
  if (currentRowCount !== lastRowCount) {
    io.emit('addMedia', 'media added or deleted'); // Emit to all connected sockets
    lastRowCount = currentRowCount;
  }
}, 5000); // Poll every 5 seconds

io.on('connection', (socket) => {
  console.log(`${socket.id} user just connected`);
  socket.on('disconnect', () => {
    console.log('user just disconnected');
  });
});

io.engine.on('connection_error', (err) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

// serve public folder for apidoc
app.use(express.static('public'));

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;

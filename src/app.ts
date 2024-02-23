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
const httpServer = createServer(app).listen(8004);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: '*',
  },
});

let soketti: Socket<ClientToServerEvents, ServerToClientEvents> | null = null;

io.on('connection', (socket) => {
  console.log(`${socket.id} user just connected`);
  soketti = socket;
  socket.on('disconnect', () => {
    console.log('user just disconnected');
  });
});

app.use((_req, res, next) => {
  res.locals.io = io;
  res.locals.soketti = soketti;
  next();
});

// serve public folder for apidoc
app.use(express.static('public'));

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;

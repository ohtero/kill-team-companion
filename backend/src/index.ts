import express, { RequestHandler } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import { matchRouter } from './API/routers/matchRouter.js';
import connectToDb from './API/middleware/connectToDb.js';
import { socketListeners } from './webSockets/matchListeners.js';

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL
  },
  connectionStateRecovery: {}
});

app.use(express.json());
dotenv.config();

const port = 3000;
const { Pool } = pg;

export const pool = new Pool({
  connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
  max: 50,
  idleTimeoutMillis: 60000
});

pool.on('error', (err) => {
  console.error(err);
  process.exit(-1);
});

io.engine.on('connection_error', (err) => {
  console.log(err);
});

socketListeners(io);

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.options('*', cors());
app.use(cors(corsOptions));
app.use('/match', connectToDb as RequestHandler, matchRouter);

server.listen(port, () => console.log(`Listening on port ${port}`));

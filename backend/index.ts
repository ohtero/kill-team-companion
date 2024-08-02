import express, { RequestHandler } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import { matchRouter } from './src/API/routers/matchRouter';
import connectToDb from './src/API/middleware/connectToDb';
import { socketListeners } from './src/webSockets/matchListeners';

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: { origin: 'http://localhost:5173' },
  connectionStateRecovery: {}
});

app.use(express.json());
dotenv.config();

const port = process.env.PORT ?? 3000;
// const connectionString = process.env.PGHOST;
const { Pool } = pg;

export const pool = new Pool({
  // connectionString: 'postgresql://root:root@192.168.200.2:5432/ktc',
  host: '192.168.200.2',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'ktc',
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

// const corsOptions = {
//   origin: 'https://localhost:5173',
//   methods: '*'
// };

app.use(cors());
app.use('/match', connectToDb as RequestHandler, matchRouter);

server.listen(port, () => console.log(`Listening on port ${port}`));

// app.listen(port, () => console.log(`Listening on ${port}`))

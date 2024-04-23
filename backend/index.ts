import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import { matchRouter } from './src/API/routers/matchRouter.ts';
import connectToDb from './src/API/middleware/connectToDb';

const app = express();

app.use(express.json());
dotenv.config();

const port = process.env.PORT || 3000;
// const connectionString = process.env.PGHOST;

const { Pool } = pg;

export const pool = new Pool({
  // connectionString: 'postgresql://root:root@192.168.200.2:5432/ktc',
  host: '192.168.200.2',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'ktc',
  max: 10,
  idleTimeoutMillis: 60000
});

pool.on('error', (err) => {
  console.error(err);
  process.exit(-1);
});

// const corsOptions = {
//   origin: 'https://localhost:5173',
//   methods: '*'
// };

app.use(cors());
app.use('/match', connectToDb, matchRouter);

app.listen(port, () => console.log(`Listening on ${port}`));

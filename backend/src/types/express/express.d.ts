import { PoolClient } from 'pg';

declare module 'express' {
  interface Request {
    dbClient?: PoolClient;
    reqBody?: { matchName: string; playerName: string };
  }
}

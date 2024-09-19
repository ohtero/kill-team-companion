import { PoolClient } from 'pg';

declare module 'express' {
  interface Request {
    dbClient?: PoolClient;
    body: { matchName: string; playerName: string };
  }
}

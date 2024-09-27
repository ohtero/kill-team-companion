import { PoolClient } from 'pg';

declare module 'express' {
  interface Request {
    dbClient?: PoolClient;
    body: Body;
  }
}

interface Body {
  matchName: string;
  playerName: string;
  registrationData: RegistrationData;
}

interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

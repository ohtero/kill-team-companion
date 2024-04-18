import { NextFunction, Request, Response } from 'express';
import { pool } from '../../../index.ts';

export default async function connectToDb(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const client = await pool.connect();
    req.dbClient = client;
    next();
  } catch (err) {
    res.status(500);
    console.error('Failed db connection:', err);
    return;
  }
}

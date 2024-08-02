import { NextFunction, Request, Response } from 'express';
import { pool } from '../../../index.ts';
import { PoolClient } from 'pg';

export default async function connectToDb(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const client = await pool.connect();
    req.dbClient = client;
    next();
  } catch (err) {
    res.status(500);
    console.error('Failed db connection:', err);
  }
}
export async function connectToPool(): Promise<PoolClient | null> {
  try {
    return await pool.connect();
  } catch (err) {
    console.error('Failed db connection:', err);
    return null;
  }
}

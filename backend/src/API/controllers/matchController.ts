import express from 'express';
import { nanoid } from 'nanoid';

async function createMatch(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const client = req.dbClient;
  const matchName: string = req.body;
  const matchId: string = nanoid(10);
  const values = [matchId, matchName];
  try {
    await client?.query(
      'INSERT INTO matches (match_id, match_name) VALUES ($1, $2)',
      values
    );
    res.status(200).json(matchId);
  } catch (err) {
    console.log(err);
    res.status(500).json('Database action failed');
  } finally {
    client?.release();
  }
}

export { createMatch };

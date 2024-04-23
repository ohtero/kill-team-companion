import { Request, Response } from 'express';
import { nanoid } from 'nanoid';

async function createMatch(req: Request, res: Response): Promise<void> {
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
    res.status(500).json('Server failed to create match.');
  } finally {
    client?.release();
  }
}

async function getMatchData(req: Request, res: Response) {
  const client = req.dbClient;
  const matchId = req.params.matchId;
  const query = {
    text: 'SELECT * FROM matches WHERE (match_id) = ($1)',
    values: [matchId]
  };
  try {
    const data = await client?.query(query);
    res.status(200).json(data?.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server failed to fetch match data.');
  }
}

async function addNewPlayer(req: Request, res: Response) {
  const client = req.dbClient;
  const matchId = req.params.matchId;
  const { playerName, playerSlot } = req.body;
  const player = `player${playerSlot + 1}_name`;
  const query = {
    text: `UPDATE matches SET ${player} = $1 WHERE match_id = $2 RETURNING ${player}`,

    values: [playerName, matchId]
  };
  try {
    const data = await client?.query(query);
    const name = Object.values(data?.rows[0])[0];
    res.status(200).json(name);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server failed to add player.');
  }
}

export { createMatch, getMatchData, addNewPlayer };

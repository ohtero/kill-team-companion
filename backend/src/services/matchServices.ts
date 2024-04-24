import { Request } from 'express';
import { nanoid } from 'nanoid';
import { MatchData } from '../types/databaseTypes';

export async function getMatchDataFromDb(
  req: Request
): Promise<[MatchData] | null> {
  const client = req.dbClient;
  const { matchId } = req.params;
  const query = {
    text: 'SELECT * FROM matches WHERE (match_id) = ($1)',
    values: [matchId]
  };
  try {
    const data = await client?.query(query);
    return data?.rows as [MatchData];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function addMatchId(req: Request): Promise<string | null> {
  const client = req.dbClient;
  const matchName: string = req.body;
  const matchId: string = nanoid(10);
  const query = {
    text: 'INSERT INTO matches (match_id, match_name) VALUES ($1, $2)',
    values: [matchId, matchName]
  };
  try {
    await client?.query(query);
    return matchId;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    client?.release();
  }
}

export async function addPlayerToMatch(req: Request): Promise<string | null> {
  const client = req.dbClient;
  const { matchId } = req.params;
  const { playerName } = req.body;
  console.log(matchId);
  const query = {
    text: `
      UPDATE matches 
      SET 
        player1_name = 
          CASE
            WHEN 
              player1_name IS NULL 
            THEN ($1)
            ELSE player1_name
          END,
        player2_name = 
          CASE
            WHEN 
              player1_name IS NOT NULL 
            AND 
              player2_name IS NULL 
            THEN ($1)
            ELSE player2_name
          END,
        player3_name = 
          CASE
            WHEN 
              player1_name IS NOT NULL 
            AND 
              player2_name IS NOT NULL 
            AND 
              player3_name IS NULL 
            THEN ($1)
            ELSE player3_name
          END,
        player4_name = 
          CASE
            WHEN 
              player1_name IS NOT NULL 
            AND 
              player2_name IS NOT NULL 
            AND 
              player3_name IS NOT NULL 
            AND 
              player4_name IS NULL 
            THEN ($1)
            ELSE player4_name
          END
      WHERE 
        match_id = ($2)
      RETURNING *
        `,

    values: [playerName, matchId]
  };
  try {
    const data = await client?.query(query);
    console.log(data?.rows);
    // const arr = Object.values(data?.rows[0])[0] as string;
    return 'success';
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    client?.release();
  }
}

import { Request } from 'express';
import { nanoid } from 'nanoid';
import { MatchData } from '../types/databaseTypes.js';
import { connectToPool } from '../API/middleware/connectToDb.js';

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
  } finally {
    client?.release();
  }
}

export async function insertNewMatchData(req: Request): Promise<string | null> {
  const client = req.dbClient;
  const matchName: string = req.body.matchName;
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

export async function addPlayerToMatch(
  req: Request
): Promise<{ playerName: string; matchId: string } | null> {
  const client = req.dbClient;
  const { matchId } = req.params;
  const { playerName } = req.body;
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
        `,

    values: [playerName, matchId]
  };
  try {
    await client?.query(query);
    return { playerName: playerName, matchId: matchId };
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    client?.release();
  }
}

export async function modifyPointsInDb(
  matchId: string,
  playerIndex: number,
  point: string,
  type: string
): Promise<object | null> {
  const client = await connectToPool();
  const playerPointCol = `player${playerIndex + 1}_${point}`;
  const text =
    type === 'add'
      ? `UPDATE matches SET ${playerPointCol} = ${playerPointCol} + 1 WHERE match_id = ($1) RETURNING ${playerPointCol}`
      : `UPDATE matches SET ${playerPointCol} = ${playerPointCol}  - 1 WHERE match_id = ($1) RETURNING ${playerPointCol}`;
  const query = {
    text: text,
    values: [matchId]
  };
  try {
    const data = await client?.query(query);
    let dataRow: Record<string, number> = { point: 0 };
    if (data) {
      dataRow = data.rows[0] as Record<string, number>;
    }
    const pointData = Object.values(dataRow)[0];

    const playerPointData = {
      playerIndex: playerIndex,
      newPoints: pointData,
      pointType: point
    };
    return playerPointData;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    client?.release();
  }
}

export async function updateTurnCountToDb(
  matchId: string,
  modType: string
): Promise<string | null> {
  const client = await connectToPool();
  const text =
    modType === 'add'
      ? `
        UPDATE matches 
        SET 
          turning_point = turning_point + 1,
          player1_cp = player1_cp + 1, 
          player2_cp = player2_cp + 1, 
          player3_cp = player3_cp + 1, 
          player4_cp = player4_cp + 1
        WHERE 
          match_id = ($1) 
        `
      : `
      UPDATE matches 
      SET 
        turning_point = turning_point - 1, 
        player1_cp = player1_cp - 1, 
        player2_cp = player2_cp - 1, 
        player3_cp = player3_cp - 1, 
        player4_cp = player4_cp - 1
      WHERE 
        match_id = ($1) 
      `;

  try {
    await client?.query(text, [matchId]);
    return 'success';
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    client?.release();
  }
}

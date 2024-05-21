import {
  RawMatchData,
  NormalizedMatchData
} from '../../../types/databaseTypes';

export function normalizeMatchData(
  matchData: RawMatchData
): NormalizedMatchData {
  const {
    match_id,
    match_name,
    mission_id,
    active,
    date,
    turning_point,
    winner_id,
    winner_name,
    draw,
    player1_id,
    player1_name,
    player1_cp,
    player1_vp,
    player2_id,
    player2_name,
    player2_cp,
    player2_vp,
    player3_id,
    player3_name,
    player3_cp,
    player3_vp,
    player4_id,
    player4_name,
    player4_cp,
    player4_vp
  } = matchData;

  const normalizedMatchData = {
    matchId: match_id,
    matchName: match_name,
    missionId: mission_id,
    active: active,
    date: date,
    turningPoint: turning_point,
    players: {
      player1: {
        id: player1_id,
        name: player1_name,
        cp: player1_cp,
        vp: player1_vp
      },
      player2: {
        id: player2_id,
        name: player2_name,
        cp: player2_cp,
        vp: player2_vp
      },
      player3: {
        id: player3_id,
        name: player3_name,
        cp: player3_cp,
        vp: player3_vp
      },
      player4: {
        id: player4_id,
        name: player4_name,
        cp: player4_cp,
        vp: player4_vp
      }
    },
    winner: {
      id: winner_id,
      name: winner_name
    },
    draw: draw
  };

  return normalizedMatchData;
}

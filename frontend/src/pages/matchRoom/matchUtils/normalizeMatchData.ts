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
    player1_crit_op,
    player1_tac_op,
    player1_kill_op,
    player2_id,
    player2_name,
    player2_cp,
    player2_crit_op,
    player2_tac_op,
    player2_kill_op,
    player3_id,
    player3_name,
    player3_cp,
    player3_crit_op,
    player3_tac_op,
    player3_kill_op,
    player4_id,
    player4_name,
    player4_cp,
    player4_crit_op,
    player4_tac_op,
    player4_kill_op
  } = matchData;

  /**
   * * "Normalized" match data object left nested for now, since it fits the use case and the structure is not predicted to change. Keep an eye out if it needs to be actually normalized in the future.
   */

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
        critOp: player1_crit_op,
        tacOp: player1_tac_op,
        killOp: player1_kill_op
      },
      player2: {
        id: player2_id,
        name: player2_name,
        cp: player2_cp,
        critOp: player2_crit_op,
        tacOp: player2_tac_op,
        killOp: player2_kill_op
      },
      player3: {
        id: player3_id,
        name: player3_name,
        cp: player3_cp,
        critOp: player3_crit_op,
        tacOp: player3_tac_op,
        killOp: player3_kill_op
      },
      player4: {
        id: player4_id,
        name: player4_name,
        cp: player4_cp,
        critOp: player4_crit_op,
        tacOp: player4_tac_op,
        killOp: player4_kill_op
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

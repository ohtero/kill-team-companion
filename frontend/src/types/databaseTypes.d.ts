export interface RawMatchData {
  match_id: string;
  match_name: string;
  mission_id: number;
  active: boolean;
  date: string; // Check if Date type is needed later
  player1_id: string;
  player2_id: string;
  player3_id: string;
  player4_id: string;
  player1_name: string;
  player2_name: string;
  player3_name: string;
  player4_name: string;
  player1_cp: number;
  player2_cp: number;
  player3_cp: number;
  player4_cp: number;
  player1_crit_op: number;
  player2_crit_op: number;
  player3_crit_op: number;
  player4_crit_op: number;
  player1_tac_op: number;
  player2_tac_op: number;
  player3_tac_op: number;
  player4_tac_op: number;
  player1_kill_op: number;
  player2_kill_op: number;
  player3_kill_op: number;
  player4_kill_op: number;
  turning_point: number;
  winner_id: string;
  winner_name: string;
  draw: boolean;
}

export interface NormalizedMatchData {
  matchId: string;
  matchName: string;
  missionId: number;
  active: boolean;
  date: string; // Check if Date type is needed later
  turningPoint: number;
  players: {
    player1: {
      id: string;
      name: string;
      cp: number;
      critOp: number;
      tacOp: number;
      killOp: number;
    };
    player2: {
      id: string;
      name: string;
      cp: number;
      critOp: number;
      tacOp: number;
      killOp: number;
    };
    player3: {
      id: string;
      name: string;
      cp: number;
      critOp: number;
      tacOp: number;
      killOp: number;
    };
    player4: {
      id: string;
      name: string;
      cp: number;
      critOp: number;
      tacOp: number;
      killOp: number;
    };
  };
  winner: {
    id: string;
    name: string;
  };
  draw: boolean;
}

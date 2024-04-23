export interface MatchData {
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
  player1_vp: number;
  player2_vp: number;
  player3_vp: number;
  player4_vp: number;
  turning_point: number;
  winner_id: string;
  winner_name: string;
  draw: boolean;
}

export interface MatchLobbyFormInput {
  displayName: string;
}

export interface MatchLobbyProps {
  matchId: string | null;
  matchData: MatchData;
  localNameData: string | null;
  playerInMatch: boolean;
  matchIsFull: boolean;
  updateMatchIsFull: (arg: boolean) => void;
  updatePlayerInMatch: (arg: boolean) => void;
  updatePlayerNames: (index: number, value: string) => void;
}

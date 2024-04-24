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
}

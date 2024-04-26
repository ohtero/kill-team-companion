export interface MatchEntryFormInput {
  displayName: string;
}

export interface MatchEntryProps {
  matchId: string | null;
  matchData: MatchData;
  localNameData: string | null;
  playerInMatch: boolean;
  matchIsFull: boolean;
  updateMatchIsFull: (arg: boolean) => void;
  updatePlayerInMatch: (arg: boolean) => void;
}

import { Socket } from 'socket.io-client';
import { NormalizedMatchData } from '../../types/databaseTypes';
import { SubmitHandler } from 'react-hook-form';

interface MatchEntryFormInput {
  displayName: string;
}

interface MatchEntryProps {
  matchId: string | null;
  matchData: MatchData;
  localNameData: string | null;
  playerInMatch: boolean;
  matchIsFull: boolean;
  updateMatchIsFull: (arg: boolean) => void;
  updatePlayerInMatch: (arg: boolean) => void;
  socket?: Socket;
}

interface NameInputFormTypes {
  socket?: Socket;
  matchId: string | null;
  matchIsFull: boolean;
  updatePlayerInMatch?: (arg: boolean) => void;
  onTestSubmit?: SubmitHandler;
}

interface MatchFeatureProps {
  increaseTurnCount?: () => void;
}

interface FeatureTabProps {
  children: React.ReactNode;
  tabName: TabName;
  activeTab: TabName;
  handleClick: (tabName: TabName) => void;
}

interface TabNavProps {
  activeTab: TabName;
  updateActiveTab: (tabName: TabName) => void;
}

export type PlayerPoint = {
  points: number;
  playerIndex: number;
  pointType: 'cp' | 'vp';
};

interface TurnPlayerPoint extends MatchFeatureProps {
  increaseTurnCount?: () => void;
}

interface TurnIndicatorProps {
  turnValue: number;
  currentTurn: number;
}

export type TabName = 'details' | 'counters' | 'mission';

type MatchContext = {
  matchData: NormalizedMatchData;
  updateMatchData: (matchData: NormalizedMatchData) => void;
  updateSocket: (socket: Socket) => void;
  modifyTurnCount: (modType: 'add' | 'subtract') => void;
  modifyPlayerPoints: (
    playerIndex: number,
    pointType: 'vp' | 'cp',
    modType: 'add' | 'subtract'
  ) => void;
  updatePlayerPoints: (
    playerIndex: number,
    newPoints: number,
    pointType: 'cp' | 'vp'
  ) => void;
  updateTurnCount: (modType: 'add' | 'subtract') => void;
  updatePlayerName: (name: string) => void;
};

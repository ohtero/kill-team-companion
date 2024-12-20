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
  onTestSubmit?: SubmitHandler<MatchEntryFormInput>;
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

type PointType = 'cp' | 'critOp' | 'tacOp' | 'killOp';

interface PointModifyButtonProps {
  pointType: PointType;
  playerIndex: number;
  children: string;
  operation: 'add' | 'subtract';
  className?: string;
}
interface PlayerPoint {
  points: number;
  playerIndex: number;
  pointType: PointType;
}

interface TurnPlayerPoint extends MatchFeatureProps {
  increaseTurnCount?: () => void;
}

interface TurnIndicatorProps {
  turnValue: number;
  currentTurn: number;
}

export type TabName = 'details' | 'counters' | 'mission';

interface MatchContext {
  matchData: NormalizedMatchData;
  updateMatchData: (matchData: NormalizedMatchData) => void;
  updateSocket: (socket: Socket) => void;
  modifyTurnCount: (modType: 'add' | 'subtract') => void;
  modifyPlayerPoints: (
    playerIndex: number,
    pointType: PointType,
    modType: 'add' | 'subtract'
  ) => void;
  updatePlayerPoints: (
    playerIndex: number,
    newPoints: number,
    pointType: PointType
  ) => void;
  updateTurnCount: (modType: 'add' | 'subtract') => void;
  updatePlayerName: (name: string) => void;
}

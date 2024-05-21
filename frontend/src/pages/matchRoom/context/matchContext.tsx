import { createContext, useContext, useState } from 'react';
import { useImmer } from 'use-immer';
import { MatchContext } from '../types';
import { NormalizedMatchData } from '../../../types/databaseTypes';
import { Socket } from 'socket.io-client';
import { changeTurnAndPoints } from './matchContextUtils';

const defaultMatchData: NormalizedMatchData = {
  matchId: '',
  matchName: '',
  missionId: NaN,
  active: false,
  date: '',
  turningPoint: 1,
  players: {
    player1: {
      id: '',
      name: '',
      cp: 3,
      vp: 0
    },
    player2: {
      id: '',
      name: '',
      cp: 3,
      vp: 0
    },
    player3: {
      id: '',
      name: '',
      cp: 3,
      vp: 0
    },
    player4: {
      id: '',
      name: '',
      cp: 3,
      vp: 0
    }
  },
  winner: {
    id: '',
    name: ''
  },
  draw: false
};

const defaultContext = {
  matchData: defaultMatchData,
  updateMatchData: () => {},
  updateSocket: () => {},
  modifyTurnCount: () => {},
  modifyPlayerPoints: () => {},
  updatePlayerPoints: () => {},
  updateTurnCount: () => {},
  updatePlayerName: () => {}
};

export const MatchDataContext = createContext<MatchContext>(defaultContext);

export const useMatchContext = () => useContext(MatchDataContext);

export function MatchDataProvider({ children }: GenericProps) {
  const [matchData, setMatchData] =
    useImmer<NormalizedMatchData>(defaultMatchData);
  const [socket, setSocket] = useState<Socket | null>(null);

  function updateMatchData(matchData: NormalizedMatchData) {
    setMatchData(matchData);
  }

  function updateSocket(socket: Socket) {
    setSocket(socket);
  }

  function modifyTurnCount(modType: 'add' | 'subtract') {
    if (
      (modType === 'add' && matchData.turningPoint === 4) ||
      (modType === 'subtract' && matchData.turningPoint === 1)
    ) {
      return;
    }
    changeTurnAndPoints(modType, setMatchData);
    socket?.emit('turningPoint', {
      matchId: matchData.matchId,
      modType: modType
    });
  }

  function updateTurnCount(modType: 'add' | 'subtract') {
    changeTurnAndPoints(modType, setMatchData);
  }

  function modifyPlayerPoints(
    playerIndex: number,
    pointType: 'vp' | 'cp',
    modType: 'add' | 'subtract'
  ) {
    const player =
      `player${playerIndex + 1}` as keyof NormalizedMatchData['players'];

    if (matchData.players[player][pointType] === 0 && modType === 'subtract') {
      return;
    }
    setMatchData((draft) => {
      modType === 'add'
        ? draft.players[player][pointType]++
        : draft.players[player][pointType]--;
    });
    socket?.emit('playerPoints', {
      playerIndex: playerIndex,
      pointType: pointType,
      modType: modType,
      matchId: matchData.matchId
    });
  }

  function updatePlayerPoints(
    playerIndex: number,
    newPoints: number,
    pointType: 'vp' | 'cp'
  ) {
    const player =
      `player${playerIndex + 1}` as keyof NormalizedMatchData['players'];
    setMatchData((draft) => {
      draft.players[player][pointType] = newPoints;
    });
  }

  function updatePlayerName(playerName: string) {
    setMatchData((draft) => {
      for (let playerKey in draft.players) {
        const player = playerKey as keyof NormalizedMatchData['players'];
        if (!draft.players[player].name) {
          draft.players[player].name = playerName;
          break;
        }
      }
    });
  }

  return (
    <MatchDataContext.Provider
      value={{
        matchData,
        updateMatchData,
        updateSocket,
        modifyPlayerPoints,
        modifyTurnCount,
        updatePlayerPoints,
        updateTurnCount,
        updatePlayerName
      }}
    >
      {children}
    </MatchDataContext.Provider>
  );
}

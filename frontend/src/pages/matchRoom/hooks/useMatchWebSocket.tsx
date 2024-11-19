import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useMatchContext } from '../context/matchContext';
import { PointType } from '../types';

export function useMatchWebSocket() {
  const socketRef = useRef<Socket>();
  const {
    updateSocket,
    updatePlayerName,
    updatePlayerPoints,
    updateTurnCount
  } = useMatchContext();

  function handleConnect() {
    socketRef.current && updateSocket(socketRef.current);
  }

  function handlePlayerPointsUpdate(data: {
    playerIndex: number;
    newPoints: number;
    pointType: PointType;
  }) {
    socketRef.current &&
      updatePlayerPoints(data.playerIndex, data.newPoints, data.pointType);
  }

  function handlePlayerNameUpdate(playerName: string) {
    updatePlayerName(playerName);
  }

  function handleTurningPointUpdate(modType: 'add' | 'subtract') {
    updateTurnCount(modType);
  }

  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      socketRef.current = io(`${import.meta.env.VITE_WEBSOCKET_URL}`);
    } else {
      socketRef.current = io({ path: `${import.meta.env.VITE_WEBSOCKET_URL}` });
    }

    socketRef.current.on('connect', handleConnect);
    socketRef.current.on('playerName', handlePlayerNameUpdate);
    socketRef.current.on('updatePlayerPoints', handlePlayerPointsUpdate);
    socketRef.current.on('turningPointUpdate', handleTurningPointUpdate);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off('playerName', handlePlayerNameUpdate);
        socketRef.current.off('updatePlayerPoints', handlePlayerPointsUpdate);
        socketRef.current.off('turningPointUpdate', handleTurningPointUpdate);
      }
    };
  }, []);

  return socketRef.current;
}

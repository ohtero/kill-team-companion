import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useMatchContext } from '../context/matchContext';

export function useMatchWebSocket(url: string) {
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
    pointType: 'vp' | 'cp';
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
    socketRef.current = io(url);

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
  }, [url]);

  return socketRef.current;
}

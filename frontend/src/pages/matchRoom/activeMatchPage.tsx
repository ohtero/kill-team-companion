import { MatchEntry } from './features/matchEntry';
import { useState, useEffect } from 'react';
import { useLocation, useLoaderData } from 'react-router-dom';
import { useSyncLocalStorage } from '../../hooks/useSyncLocalStorage';
import { MatchData } from '../../types/databaseTypes';
import { MatchFeaturesView } from './features/matchFeaturesView';
import { useWebSocket } from './hooks/useWebSocket';

export default function ActiveMatchPage() {
  const socket = useWebSocket('http://localhost:3000');
  const location = useLocation();
  const data = useLoaderData() as [MatchData];

  const searchParams = new URLSearchParams(location.search);
  const matchId = searchParams.get('id');

  const localNameData = useSyncLocalStorage('playerName');

  const [matchIsFull, setMatchIsFull] = useState(false);
  const [matchData, setMatchData] = useState<MatchData>(data[0]);
  const [playerInMatch, setPlayerInMatch] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('playerName');
    const playerExists = Object.values(matchData).includes(name);
    if (playerExists && name !== null) {
      updatePlayerInMatch(true);
    }
  }, []);

  useEffect(() => {
    if (matchData.players.player4.name !== null) {
      updateMatchIsFull(true);
      return;
    }
    setMatchIsFull(false);
  }, [matchData]);

  useEffect(() => {
    console.log('active match page rendered');
  }, []);

  useEffect(() => {
    updateMatchData(normalizedMatchData);
  }, [normalizedMatchData]);

  useEffect(() => {
    socket?.emit('joinRoom', matchData.matchId);
    socket?.on(
      'updatePlayerPoints',
      (data: {
        playerIndex: number;
        newPoints: number;
        pointType: 'vp' | 'cp';
      }) => {
        updatePlayerPoints(data.playerIndex, data.newPoints, data.pointType);
      }
    );
    socket?.on('playerName', (playerName: string) => {
      updatePlayerName(playerName);
    });
    socket?.on('turningPointUpdate', (modType: 'add' | 'subtract') => {
      console.log(`turning point update received by ${socket.id}`);
      updateTurnCount(modType);
    });
    socket?.on('disconnect', () =>
      console.log(`socket ${socket.id} disconnecting`)
    );
    socket?.on('connect', () => {
      updateSocket(socket);
    });

    return () => {
      socket?.off(
        'updatePlayerPoints',
        (data: {
          playerIndex: number;
          newPoints: number;
          pointType: 'vp' | 'cp';
        }) => {
          updatePlayerPoints(data.playerIndex, data.newPoints, data.pointType);
        }
      );
      socket?.off('playerName', (playerName: string) => {
        updatePlayerName(playerName);
      });
      socket?.off('turningPointUpdate', (modType: 'add' | 'subtract') => {
        updateTurnCount(modType);
      });
      socket?.off('connect', () => {
        updateSocket(socket);
      });
    };
  }, [socket]);

  function updatePlayerInMatch(state: boolean) {
    setPlayerInMatch(state);
  }

  function updateMatchIsFull(state: boolean) {
    setMatchIsFull(state);
  }

  return (
    <>
      {!playerInMatch ? (
        <MatchEntry
          matchId={matchId}
          matchData={matchData}
          localNameData={localNameData}
          playerInMatch={playerInMatch}
          matchIsFull={matchIsFull}
          updatePlayerInMatch={updatePlayerInMatch}
          updateMatchIsFull={updateMatchIsFull}
          socket={socket}
        />
      ) : (
        <MatchFeaturesView></MatchFeaturesView>
      )}
    </>
  );
}

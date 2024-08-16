import { MatchEntry } from './features/matchEntry';
import { useState, useEffect } from 'react';
import { useLocation, useLoaderData } from 'react-router-dom';
import { useSyncLocalStorage } from '../../hooks/useSyncLocalStorage';
import { NormalizedMatchData } from '../../types/databaseTypes';
import { MatchFeaturesView } from './components/matchFeaturesView';
import { useMatchContext } from './context/matchContext';
import { useMatchWebSocket } from './hooks/useMatchWebSocket';

// TODO: Look into reducing useEffects if possible.

export default function ActiveMatchPage() {
  const socket = useMatchWebSocket();
  const location = useLocation();
  const localNameData = useSyncLocalStorage('playerName');
  const normalizedMatchData = useLoaderData() as NormalizedMatchData;
  const { matchData, updateMatchData } = useMatchContext();

  const searchParams = new URLSearchParams(location.search);
  const matchId = searchParams.get('id');

  const [matchIsFull, setMatchIsFull] = useState(false);
  const [playerInMatch, setPlayerInMatch] = useState(false);

  useEffect(() => {
    const playerNames = Object.values(normalizedMatchData.players).map(
      (player) => player.name
    );
    const storedName = localStorage.getItem('playerName');
    if (storedName !== null && playerNames.includes(storedName)) {
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
    updateMatchData(normalizedMatchData);
  }, [normalizedMatchData]);

  useEffect(() => {
    socket?.emit('joinRoom', matchData.matchId);
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
        <MatchFeaturesView />
      )}
    </>
  );
}

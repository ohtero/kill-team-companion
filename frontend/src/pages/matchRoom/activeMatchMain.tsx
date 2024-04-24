import { MatchLobby } from './matchLobby';
import { useState, useEffect } from 'react';
import { useLocation, useLoaderData } from 'react-router-dom';
import { useSyncLocalStorage } from '../../hooks/useSyncLocalStorage';
import { MatchData } from '../../types/databaseTypes';

export default function ActiveMatchPage() {
  const location = useLocation();
  const data = useLoaderData() as [MatchData];

  const searchParams = new URLSearchParams(location.search);
  const matchId = searchParams.get('id');

  const localNameData = useSyncLocalStorage('playerName');

  const [matchIsFull, setMatchIsFull] = useState(false);
  const [matchData, setMatchData] = useState<MatchData>(data[0]);
  const [playerInMatch, setPlayerInMatch] = useState(false);

  const players = [
    matchData.player1_name,
    matchData.player2_name,
    matchData.player3_name,
    matchData.player4_name
  ];

  useEffect(() => {
    const name = localStorage.getItem('playerName');
    const playerExists = Object.values(matchData).includes(name);
    if (playerExists && name !== null) {
      updatePlayerInMatch(true);
    }
  }, []);

  function updatePlayerInMatch(state: boolean) {
    setPlayerInMatch(state);
  }

  function updateMatchIsFull(state: boolean) {
    setMatchIsFull(state);
  }

  return (
    <>
      {!playerInMatch ? (
        <MatchLobby
          matchId={matchId}
          matchData={matchData}
          localNameData={localNameData}
          playerInMatch={playerInMatch}
          matchIsFull={matchIsFull}
          updatePlayerInMatch={updatePlayerInMatch}
          updateMatchIsFull={updateMatchIsFull}
        />
      ) : (
        <p>{players}</p>
      )}
    </>
  );
}

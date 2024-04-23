import { MatchLobby } from './matchLobby';
import { useState } from 'react';
import { useLocation, useLoaderData } from 'react-router-dom';
import { MatchData } from './types';
import { useSyncLocalStorage } from '../../hooks/useSyncLocalStorage';

export default function ActiveMatchPage() {
  const location = useLocation();
  const data = useLoaderData() as [MatchData];

  const searchParams = new URLSearchParams(location.search);
  const matchId = searchParams.get('id');

  const localNameData = useSyncLocalStorage('playerName');

  const [matchIsFull, setMatchIsFull] = useState(false);
  const [matchData, setMatchData] = useState<MatchData>(data[0]);
  const [playerInMatch, setPlayerInMatch] = useState(false);

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
        <p>player {localNameData} in match</p>
      )}
    </>
  );
}

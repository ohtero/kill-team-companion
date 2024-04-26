import { MatchEntry } from './features/matchEntry';
import { useState, useEffect } from 'react';
import { useLocation, useLoaderData } from 'react-router-dom';
import { useSyncLocalStorage } from '../../hooks/useSyncLocalStorage';
import { MatchData } from '../../types/databaseTypes';
import { MatchFeaturesView } from './features/matchFeaturesView';

export default function ActiveMatchPage() {
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
        />
      ) : (
        <MatchFeaturesView></MatchFeaturesView>
      )}
    </>
  );
}

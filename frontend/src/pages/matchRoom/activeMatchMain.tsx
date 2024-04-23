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

  const players = [
    matchData.player1_name,
    matchData.player2_name,
    matchData.player3_name,
    matchData.player4_name
  ];

  function updatePlayerInMatch(state: boolean) {
    setPlayerInMatch(state);
  }

  function updateMatchIsFull(state: boolean) {
    setMatchIsFull(state);
  }

  function updatePLayerNames(index: number, value: string) {
    switch (index) {
      case 1:
        setMatchData({ ...matchData, player1_name: value });
        break;
      case 2:
        setMatchData({ ...matchData, player2_name: value });
        break;
      case 3:
        setMatchData({ ...matchData, player3_name: value });
        break;
      case 4:
        setMatchData({ ...matchData, player4_name: value });
        break;

      default:
        break;
    }
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
          updatePlayerNames={updatePLayerNames}
        />
      ) : (
        <p>{players}</p>
      )}
    </>
  );
}

import { useSearchParams } from 'react-router-dom';
import { MatchLobby } from './matchLobby';
import { useState } from 'react';

export default function ActiveMatchPage() {
  // const location = useLocation();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const id = params.get('id');
  const playerData = useState;

  return <MatchLobby></MatchLobby>;
}

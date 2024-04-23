import { LoaderFunctionArgs } from 'react-router-dom';
import { MatchData } from '../pages/matchRoom/types';

export async function getMatchData({
  request
}: LoaderFunctionArgs): Promise<[MatchData] | string | undefined> {
  const url = new URL(request.url);
  const matchId = url.searchParams.get('id');
  try {
    const res = await fetch(
      `http://localhost:3000/match/match-data/${matchId}`,
      {
        method: 'GET',
        mode: 'cors'
      }
    );
    if (res.ok) {
      const data: [MatchData] = await res.json();
      return data;
    }
  } catch (error) {
    return 'Failed to fetch match data.';
  }
}

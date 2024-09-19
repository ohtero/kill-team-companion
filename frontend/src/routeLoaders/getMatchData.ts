import { LoaderFunctionArgs } from 'react-router-dom';
import { RawMatchData, NormalizedMatchData } from '../types/data';
import { normalizeMatchData } from '../pages/matchRoom/matchUtils/normalizeMatchData';

export async function getMatchData({
  request
}: LoaderFunctionArgs): Promise<NormalizedMatchData | string | undefined> {
  const url = new URL(request.url);
  const matchId = url.searchParams.get('id');
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/match/match-data/${matchId}`,
      {
        method: 'GET',
        mode: 'cors'
      }
    );
    if (res.ok) {
      const data: [RawMatchData] = await res.json();
      const normalizedData = normalizeMatchData(data[0]);
      return normalizedData;
    }
  } catch (error) {
    return 'Failed to fetch match data.';
  }
}

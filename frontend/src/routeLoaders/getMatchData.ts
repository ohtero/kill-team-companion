import { LoaderFunctionArgs } from 'react-router-dom';
import {
  RawMatchData,
  NormalizedMatchData
} from '../../src/types/databaseTypes';
import { normalizeMatchData } from '../pages/matchRoom/matchUtils/normalizeMatchData';

export async function getMatchData({
  request
}: LoaderFunctionArgs): Promise<NormalizedMatchData | string | undefined> {
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
      const data: [RawMatchData] = (await res.json()) as [RawMatchData];
      const normalizedData = normalizeMatchData(data[0]);
      return normalizedData;
    }
  } catch (error) {
    return 'Failed to fetch match data.';
  }
}

import { NormalizedMatchData } from '../../../types/databaseTypes';

export function isMatchData(
  data: NormalizedMatchData | {}
): data is NormalizedMatchData {
  return Object.keys(data).includes('matchId');
}

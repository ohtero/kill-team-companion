import { NormalizedMatchData } from '../../../types/data';

// * Current version does not utilize this type guard. Kept intact if it is needed in future. Remove if no use arises.

export function isMatchData(
  data: NormalizedMatchData | object
): data is NormalizedMatchData {
  return Object.keys(data).includes('matchId');
}

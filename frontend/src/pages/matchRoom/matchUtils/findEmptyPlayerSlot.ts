import { MatchData } from '../types';

export function findEmptyPlayerSlot(matchData: MatchData) {
  const { player1_name, player2_name, player3_name, player4_name } = matchData;
  const players = { player1_name, player2_name, player3_name, player4_name };
  const playerArr = Object.values(players);
  const nextEmptyPlayerSlot = playerArr.findIndex((elem) => elem === null);
  return nextEmptyPlayerSlot;
}

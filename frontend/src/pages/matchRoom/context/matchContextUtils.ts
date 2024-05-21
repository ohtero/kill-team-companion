import { NormalizedMatchData } from '../../../types/databaseTypes';
import { Draft } from 'immer';

export function changeTurnAndPoints(
  modType: 'add' | 'subtract',
  setState: (updater: (draft: Draft<NormalizedMatchData>) => void) => void
) {
  setState((draft) => {
    if (modType === 'add') {
      draft.turningPoint++;
      Object.values(draft.players).map((player) => {
        player.cp++;
      });
    } else if (modType === 'subtract') {
      draft.turningPoint--;
      Object.values(draft.players).map((player) => {
        player.cp > 0 && player.cp--;
      });
    }
  });
}

import { Router } from 'express';
import {
  createMatch,
  getMatchData,
  addNewPlayer
  // modifyPlayerPoints,
  // modifyTurnCount
} from '../controllers/matchController';

const matchRouter = Router();

matchRouter.post('/new-match', () => createMatch);
matchRouter.get('/match-data/:matchId', () => getMatchData);
matchRouter.post('/new-player/:matchId', () => addNewPlayer);
// matchRouter.post('/:matchId/:playerIndex/:point/:type', modifyPlayerPoints);
// matchRouter.post('/turn/:matchId/:type', modifyTurnCount);

export { matchRouter };

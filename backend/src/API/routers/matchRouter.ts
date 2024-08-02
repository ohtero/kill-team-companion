import { RequestHandler, Router } from 'express';
import {
  createMatch,
  getMatchData,
  addNewPlayer
  // modifyPlayerPoints,
  // modifyTurnCount
} from '../controllers/matchController';

const matchRouter = Router();

matchRouter.post('/new-match', createMatch as RequestHandler);
matchRouter.get('/match-data/:matchId', getMatchData as RequestHandler);
matchRouter.post('/new-player/:matchId', addNewPlayer as RequestHandler);
// matchRouter.post('/:matchId/:playerIndex/:point/:type', modifyPlayerPoints);
// matchRouter.post('/turn/:matchId/:type', modifyTurnCount);

export { matchRouter };

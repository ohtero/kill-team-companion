import { Router } from 'express';
import {
  createMatch,
  getMatchData,
  addNewPlayer
} from '../controllers/matchController';

const matchRouter = Router();

matchRouter.post('/new-match', createMatch);
matchRouter.get('/match-data/:matchId', getMatchData);
matchRouter.post('/new-player/:matchId', addNewPlayer);

export { matchRouter };

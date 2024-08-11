import { RequestHandler, Router } from 'express';
import {
  createMatch,
  getMatchData,
  addNewPlayer
} from '../controllers/matchController.js';

const matchRouter = Router();

matchRouter.post('/new-match', createMatch as RequestHandler);
matchRouter.get('/match-data/:matchId', getMatchData as RequestHandler);
matchRouter.post('/new-player/:matchId', addNewPlayer as RequestHandler);

export { matchRouter };

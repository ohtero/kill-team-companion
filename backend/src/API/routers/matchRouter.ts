import { Router } from 'express';
import { createMatch } from '../controllers/matchController';

const matchRouter = Router();

matchRouter.post('/new-match', createMatch);

export { matchRouter };

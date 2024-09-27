import { Router, RequestHandler } from 'express';
import { registerUser } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post('/register', registerUser as RequestHandler);
authRouter.post('/login');

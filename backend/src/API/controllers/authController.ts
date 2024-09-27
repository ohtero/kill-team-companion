import { Request, Response } from 'express';
import { insertUserToDb } from '../../services/authServices.js';
import { AppError } from '../../classExtensions/errorExtension.js';

export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const dbResponse = await insertUserToDb(req);
    if (dbResponse instanceof AppError) {
      res.status(400).json('Invalid input or action.');
    } else {
      res.status(200).json('Registration successful');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Something went wrong. Try again later.');
  }
}

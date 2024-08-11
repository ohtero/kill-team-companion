import { Request, Response } from 'express';
import {
  insertNewMatchData,
  addPlayerToMatch,
  getMatchDataFromDb
} from '../../services/matchServices.js';
import { AppError } from '../../classExtensions/errorExtension.js';

async function createMatch(req: Request, res: Response): Promise<void> {
  try {
    const dbResponse = await insertNewMatchData(req);
    if (dbResponse) {
      res.status(200).json(dbResponse);
    } else {
      throw new AppError(
        'dbError',
        'Database Failure! Match id could not be created.'
      );
    }
  } catch (err) {
    const error = err as Error;
    const message =
      error.name === 'dbError'
        ? error.message
        : 'Server error! Match could not be created..';
    res.status(500).json(message);
    console.error('MATCH CREATION ERROR: ', error);
  }
}

async function getMatchData(req: Request, res: Response): Promise<void> {
  try {
    const dbResponse = await getMatchDataFromDb(req);
    if (dbResponse) {
      res.status(200).json(dbResponse);
    } else {
      throw new AppError(
        'dbError',
        'Database failure! Match data could not be fetched.'
      );
    }
  } catch (err) {
    const error = err as Error;
    const message =
      error.name === 'dbError'
        ? error.message
        : 'Server error! Player could not be added.';
    res.status(500).json(message);
    console.error('MATCH DATA FETCHING ERROR: ', error);
  }
}

async function addNewPlayer(req: Request, res: Response): Promise<void> {
  try {
    const dbResponse = await addPlayerToMatch(req);
    if (dbResponse) {
      res.status(200).json(dbResponse.playerName);
    } else {
      throw new AppError(
        'dbError',
        'Database failure! Player could not be added.'
      );
    }
  } catch (err) {
    const error = err as Error;
    const message =
      error.name === 'dbError'
        ? error.message
        : 'Server error! Player could not be added.';
    res.status(500).json(message);
    console.error('NEW PLAYER ADDITION ERROR: ', error);
  }
}

export {
  createMatch,
  getMatchData,
  addNewPlayer
  // modifyPlayerPoints,
  // modifyTurnCount
};

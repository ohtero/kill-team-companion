import { Request, Response } from 'express';
import {
  insertNewMatchData,
  addPlayerToMatch,
  getMatchDataFromDb
} from '../../services/matchServices';
import { AppError } from '../../classExtensions/errorExtension';

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
    console.log('MATCH CREATION ERROR: ' + error.stack);
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
    console.log('MATCH DATA FETCHING ERROR: ' + error.stack);
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
    console.log('NEW PLAYER ADDITION ERROR: ' + error.stack);
  }
}

// async function modifyPlayerPoints(req: Request, res: Response): Promise<void> {
//   try {
//     const dbResponse = await modifyPointsInDb(req);
//     if (dbResponse) {
//       res.status(200).json();
//       io.on('connection', (socket) => {
//         io.emit('playerPointsUpdate', dbResponse);
//       });
//     } else {
//       throw new AppError(
//         'dbError',
//         'Database failure! Player could not be added.'
//       );
//     }
//   } catch (error) {
//     const err = error as Error;
//     const message =
//       err.name === 'dbError'
//         ? err.message
//         : 'Server error! Player could not be added.';
//     res.status(500).json(message);
//   }
// }

// async function modifyTurnCount(req: Request, res: Response): Promise<void> {
//   try {
//     const dbResponse = await updateTurnCountToDb(req);
//     if (dbResponse) {
//       res.status(200).json(dbResponse);
//       // io.emit('turnCountUpdate', dbResponse);
//     } else {
//       throw new AppError(
//         'dbError',
//         'Database failure! Player could not be added.'
//       );
//     }
//   } catch (error) {
//     const err = error as Error;
//     const message =
//       err.name === 'dbError'
//         ? err.message
//         : 'Server error! Player could not be added.';
//     res.status(500).json(message);
//   }
// }

export {
  createMatch,
  getMatchData,
  addNewPlayer
  // modifyPlayerPoints,
  // modifyTurnCount
};

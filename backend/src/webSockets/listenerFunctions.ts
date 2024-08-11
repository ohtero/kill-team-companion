import { Server, Socket } from 'socket.io';
import { AppError } from '../classExtensions/errorExtension.js';
import {
  modifyPointsInDb,
  updateTurnCountToDb
} from '../services/matchServices.js';

export async function updatePlayerPoints(
  io: Server,
  socket: Socket,
  data: {
    playerIndex: number;
    pointType: string;
    modType: string;
    matchId: string;
  }
): Promise<void> {
  try {
    const { playerIndex, pointType, modType, matchId } = data;
    const dbRes = await modifyPointsInDb(
      matchId,
      playerIndex,
      pointType,
      modType
    );
    if (!dbRes) {
      throw new AppError('dbError');
    }
    io.to(matchId).except(socket.id).emit('updatePlayerPoints', dbRes);
  } catch (error) {
    const err = error as Error;
    const errMsg =
      err.name === 'dbError'
        ? 'Database error while updating player points.'
        : 'Server error while updating player points.';
    console.log('POINT UPDATE ERROR: ' + err.stack);
    io.to(socket.id).emit(errMsg);
  }
}

export async function updateTurningPoint(
  io: Server,
  socket: Socket,
  data: { matchId: string; modType: string }
): Promise<void> {
  try {
    const dbRes = await updateTurnCountToDb(data.matchId, data.modType);
    if (!dbRes) {
      throw new AppError('dbError');
    }
    console.log(`turning point modified by ${socket.id}`);
    io.to(data.matchId)
      .except(socket.id)
      .emit('turningPointUpdate', data.modType);
  } catch (error) {
    const err = error as Error;
    const errMsg =
      err.name === 'dbError'
        ? 'Database error while updating Turning Point.'
        : 'Server error while updating Turning Point.';
    console.log('POINT UPDATE ERROR: ' + err.stack);
    io.to(socket.id).emit(errMsg);
  }
}

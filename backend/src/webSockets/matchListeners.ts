import { Server } from 'socket.io';
import { updatePlayerPoints, updateTurningPoint } from './listenerFunctions.js';

export const socketListeners = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
    });
    socket.on('joinRoom', async (matchId: string) => {
      await socket.join(matchId);
    });
    socket.on('newPlayer', (data: { playerName: string; matchId: string }) => {
      io.to(data.matchId).emit('playerName', data.playerName);
    });
    socket.on(
      'playerPoints',
      (data: {
        playerIndex: number;
        pointType: string;
        modType: string;
        matchId: string;
      }) => {
        void updatePlayerPoints(io, socket, data);
      }
    );
    socket.on('turningPoint', (data: { matchId: string; modType: string }) => {
      void updateTurningPoint(io, socket, data);
    });
  });
};

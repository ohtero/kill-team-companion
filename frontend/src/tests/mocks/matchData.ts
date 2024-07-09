export const mockMatchData = {
  matchId: '',
  matchName: '',
  missionId: NaN,
  active: false,
  date: '',
  turningPoint: 1,
  players: {
    player1: {
      id: '',
      name: '',
      cp: 3,
      vp: 0
    },
    player2: {
      id: '',
      name: '',
      cp: 3,
      vp: 0
    },
    player3: {
      id: '',
      name: '',
      cp: 3,
      vp: 0
    },
    player4: {
      id: '',
      name: '',
      cp: 3,
      vp: 0
    }
  },
  winner: {
    id: '',
    name: ''
  },
  draw: false
};

export const mockMatchDataContextValue = {
  matchData: mockMatchData,
  updateMatchData: vi.fn(),
  updateSocket: vi.fn(),
  modifyPlayerPoints: vi.fn(),
  modifyTurnCount: vi.fn(),
  updatePlayerPoints: vi.fn(),
  updateTurnCount: vi.fn(),
  updatePlayerName: vi.fn()
};

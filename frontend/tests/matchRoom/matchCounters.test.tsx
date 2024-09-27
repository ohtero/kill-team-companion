import { it, expect, describe, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '../testUtils';
import {
  MatchDataProvider,
  MatchDataContext
} from '../../src/pages/matchRoom/context/matchContext';
import { mockMatchDataContextValue } from '../mocks/matchData';
import { MatchCounters } from '../../src/pages/matchRoom/features/matchCounters';
import { Counter } from '../../src/pages/matchRoom/components/counter';
describe('Match counters', () => {
  describe('Turn counter', () => {
    describe('Turn counter behavior with mocked context', () => {
      beforeEach(() => {
        render(
          <MatchDataContext.Provider value={mockMatchDataContextValue}>
            <MatchCounters />
          </MatchDataContext.Provider>
        );
        afterEach(() => {
          mockMatchDataContextValue.modifyTurnCount.mockClear();
        });
      });

      describe('Turn counter behavior If turn count is 1 <> 4', () => {
        it('should call a function to increase turn count when the `add` button is clicked', () => {
          const addTurnFn = mockMatchDataContextValue.modifyTurnCount;
          const button = screen.getByText('+');
          fireEvent.click(button);
          expect(addTurnFn).toHaveBeenCalledWith('add');
        });

        it('should call a function to decrease turn count when the `subtract` button is clicked', () => {
          mockMatchDataContextValue.matchData.turningPoint = 2;

          const addTurnFn = mockMatchDataContextValue.modifyTurnCount;
          const button = screen.getByText('-');
          fireEvent.click(button);
          expect(addTurnFn).toHaveBeenCalledWith('subtract');
        });
      });

      describe('Turn counter behavior If turn count is 1 or 4', () => {
        it('should not call a function to increase turn count', () => {
          mockMatchDataContextValue.matchData.turningPoint = 4;

          const addTurnFn = mockMatchDataContextValue.modifyTurnCount;
          const button = screen.getByText('+');
          fireEvent.click(button);
          expect(addTurnFn).not.toHaveBeenCalled();
        });

        it('should call a function to decrease turn count', () => {
          mockMatchDataContextValue.matchData.turningPoint = 1;

          const addTurnFn = mockMatchDataContextValue.modifyTurnCount;
          const button = screen.getByText('-');
          fireEvent.click(button);
          expect(addTurnFn).not.toHaveBeenCalled();
        });
      });
    });

    describe('Turn indicator behavior with real context', () => {
      beforeEach(() => {
        render(
          <MatchDataProvider>
            <MatchCounters />
          </MatchDataProvider>
        );
      });

      it('renders a border if the turn indicator matches current turn from context', () => {
        const increaseTurnBtn = screen.getByRole('button', { name: '+' });
        const turn1Indicator = screen.getByRole('listitem', {
          name: 'turn1Indicator'
        });
        const turn2Indicator = screen.getByRole('listitem', {
          name: 'turn2Indicator'
        });

        expect(turn1Indicator).toHaveStyle(
          'border: 3px solid HSLA$(${props.theme.colors.tertiary})'
        );
        expect(turn2Indicator).toHaveStyle('border: 3px solid transparent');

        fireEvent.click(increaseTurnBtn);

        expect(turn1Indicator).toHaveStyle('border: 3px solid transparent');
        expect(turn2Indicator).toHaveStyle(
          'border: 3px solid HSLA$(${props.theme.colors.tertiary})'
        );
      });
    });

    describe('Turn counter interaction with player command points', () => {
      beforeEach(() => {
        render(
          <MatchDataProvider>
            <MatchCounters />
          </MatchDataProvider>
        );
      });

      it(`should increase all players' command points by 1 when turn count increases by 1 if turn count is 4 or less`, () => {
        const increaseTurnBtn = screen.getByRole('button', { name: '+' });
        const player1Cp = screen.getByRole('player1cp');
        const player2Cp = screen.getByRole('player2cp');
        const player3Cp = screen.getByRole('player3cp');
        const player4Cp = screen.getByRole('player4cp');

        expect(player1Cp).toHaveTextContent('3');
        expect(player2Cp).toHaveTextContent('3');
        expect(player3Cp).toHaveTextContent('3');
        expect(player4Cp).toHaveTextContent('3');

        fireEvent.click(increaseTurnBtn);

        expect(player1Cp).toHaveTextContent('4');
        expect(player2Cp).toHaveTextContent('4');
        expect(player3Cp).toHaveTextContent('4');
        expect(player4Cp).toHaveTextContent('4');

        fireEvent.click(increaseTurnBtn);
        fireEvent.click(increaseTurnBtn);
        fireEvent.click(increaseTurnBtn);

        expect(player1Cp).toHaveTextContent('6');
        expect(player2Cp).toHaveTextContent('6');
        expect(player3Cp).toHaveTextContent('6');
        expect(player4Cp).toHaveTextContent('6');
      });

      it(`should decrease all players' command points by 1 when turn count decreases by 1 if turn count is 2 or more`, () => {
        const decreaseTurnBtn = screen.getByRole('button', { name: '-' });
        const increaseTurnBtn = screen.getByRole('button', { name: '+' });
        const player1Cp = screen.getByRole('player1cp');
        const player2Cp = screen.getByRole('player2cp');
        const player3Cp = screen.getByRole('player3cp');
        const player4Cp = screen.getByRole('player4cp');

        expect(player1Cp).toHaveTextContent('3');
        expect(player2Cp).toHaveTextContent('3');
        expect(player3Cp).toHaveTextContent('3');
        expect(player4Cp).toHaveTextContent('3');

        fireEvent.click(increaseTurnBtn);

        expect(player1Cp).toHaveTextContent('4');
        expect(player2Cp).toHaveTextContent('4');
        expect(player3Cp).toHaveTextContent('4');
        expect(player4Cp).toHaveTextContent('4');

        fireEvent.click(decreaseTurnBtn);

        expect(player1Cp).toHaveTextContent('3');
        expect(player2Cp).toHaveTextContent('3');
        expect(player3Cp).toHaveTextContent('3');
        expect(player4Cp).toHaveTextContent('3');

        fireEvent.click(decreaseTurnBtn);

        expect(player1Cp).toHaveTextContent('3');
        expect(player2Cp).toHaveTextContent('3');
        expect(player3Cp).toHaveTextContent('3');
        expect(player4Cp).toHaveTextContent('3');
      });
    });
  });
  describe('Player point counters', () => {
    describe('Player point counter behavior with mock context', () => {
      afterEach(() => {
        mockMatchDataContextValue.modifyPlayerPoints.mockClear();
      });
      it('should create a counter displaying a player point', () => {
        render(
          <MatchDataContext.Provider value={mockMatchDataContextValue}>
            <Counter points={3} playerIndex={0} pointType="cp" />
          </MatchDataContext.Provider>
        );
        const points = screen.getByRole('player1cp');
        expect(points.textContent).toBe('3');
      });

      it('should call function to add a point on add point button click', () => {
        render(
          <MatchDataContext.Provider value={mockMatchDataContextValue}>
            <Counter points={3} playerIndex={1} pointType="cp" />
          </MatchDataContext.Provider>
        );
        const addPointsFn = mockMatchDataContextValue.modifyPlayerPoints;
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
        expect(addPointsFn).toHaveBeenCalledWith(1, 'cp', 'add');
      });

      it('should call function with subtract parameter on a subtract point button click if the point count is greater than 0.', () => {
        render(
          <MatchDataContext.Provider value={mockMatchDataContextValue}>
            <Counter points={3} playerIndex={1} pointType="cp" />
          </MatchDataContext.Provider>
        );
        const subtractPointsFn = mockMatchDataContextValue.modifyPlayerPoints;
        const subtractButton = screen.getByText('-');
        fireEvent.click(subtractButton);
        expect(subtractPointsFn).toHaveBeenCalledWith(1, 'cp', 'subtract');
      });

      it('points should not go to negative if the point value is 0 when subtract point is pressed', () => {
        render(
          <MatchDataContext.Provider
            value={{
              matchData: {
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
                    cp: 0,
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
              },
              updateMatchData: vi.fn(),
              updateSocket: vi.fn(),
              modifyPlayerPoints: vi.fn(),
              modifyTurnCount: vi.fn(),
              updatePlayerPoints: vi.fn(),
              updateTurnCount: vi.fn(),
              updatePlayerName: vi.fn()
            }}
          >
            <Counter points={0} playerIndex={1} pointType="cp" />
          </MatchDataContext.Provider>
        );
        const subtractPointsFn = mockMatchDataContextValue.modifyPlayerPoints;
        const subtractButton = screen.getByText('-');
        fireEvent.click(subtractButton);
        expect(subtractPointsFn).not.toHaveBeenCalled();
      });

      it('function should change the targeted player based on playerIndex prop ', () => {
        render(
          <MatchDataContext.Provider value={mockMatchDataContextValue}>
            <Counter points={3} playerIndex={3} pointType="cp" />
          </MatchDataContext.Provider>
        );
        const addPointsFn = mockMatchDataContextValue.modifyPlayerPoints;
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
        expect(addPointsFn).toHaveBeenCalledWith(3, 'cp', 'add');
      });

      it('function should change the targeted point type based on pointType prop | case CP ', () => {
        render(
          <MatchDataContext.Provider value={mockMatchDataContextValue}>
            <Counter points={3} playerIndex={3} pointType="cp" />
          </MatchDataContext.Provider>
        );
        const addPointsFn = mockMatchDataContextValue.modifyPlayerPoints;
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
        expect(addPointsFn).toHaveBeenCalledWith(3, 'cp', 'add');
      });

      it('function should change the targeted point type based on pointType prop | case VP ', () => {
        render(
          <MatchDataContext.Provider value={mockMatchDataContextValue}>
            <Counter points={3} playerIndex={3} pointType="vp" />
          </MatchDataContext.Provider>
        );
        const addPointsFn = mockMatchDataContextValue.modifyPlayerPoints;
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
        expect(addPointsFn).toHaveBeenCalledWith(3, 'vp', 'add');
      });
    });
    describe('Player counter behavior with real context', () => {
      beforeEach(() => {
        render(
          <MatchDataProvider>
            <MatchCounters />
          </MatchDataProvider>
        );
      });

      it('renders nameplates, Command, and Victory Point counters for each player that has a name supplied', () => {
        expect(screen.getByText('player1')).toBeInTheDocument();
        expect(screen.getByText('player2')).toBeInTheDocument();
        expect(screen.getByText('player3')).toBeInTheDocument();
        expect(screen.getByText('player4')).toBeInTheDocument();

        expect(screen.getByRole('player1cp')).toHaveTextContent('3');
        expect(screen.getByRole('player2cp')).toHaveTextContent('3');
        expect(screen.getByRole('player3cp')).toHaveTextContent('3');
        expect(screen.getByRole('player4cp')).toHaveTextContent('3');

        expect(screen.getByRole('player1vp')).toHaveTextContent('0');
        expect(screen.getByRole('player2vp')).toHaveTextContent('0');
        expect(screen.getByRole('player3vp')).toHaveTextContent('0');
        expect(screen.getByRole('player4vp')).toHaveTextContent('0');
      });
      it('adds points when function in context are called', () => {
        const addPlayer1Cp = screen.getByRole('button', {
          name: 'add cp to player1'
        });
        const addPlayer1Vp = screen.getByRole('button', {
          name: 'add vp to player1'
        });

        fireEvent.click(addPlayer1Cp);
        fireEvent.click(addPlayer1Vp);
        expect(screen.getByRole('player1cp')).toHaveTextContent('4');
        expect(screen.getByRole('player1vp')).toHaveTextContent('1');
      });
      it('subtract points if a point count is greater than 0', () => {
        const subtractPlayer1Cp = screen.getByRole('button', {
          name: 'subtract cp from player1'
        });
        const subtractPlayer1Vp = screen.getByRole('button', {
          name: 'subtract vp from player1'
        });

        expect(screen.getByRole('player1cp')).toHaveTextContent('3');
        expect(screen.getByRole('player1vp')).toHaveTextContent('0');

        fireEvent.click(subtractPlayer1Cp);
        fireEvent.click(subtractPlayer1Cp);
        fireEvent.click(subtractPlayer1Cp);
        fireEvent.click(subtractPlayer1Cp);
        expect(screen.getByRole('player1cp')).toHaveTextContent('0');

        fireEvent.click(subtractPlayer1Vp);
        expect(screen.getByRole('player1vp')).toHaveTextContent('0');
      });
    });
  });
});

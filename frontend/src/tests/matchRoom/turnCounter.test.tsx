import { it, expect, describe } from 'vitest';
import { screen, render, fireEvent } from '../testUtils';
import { MatchDataContext } from '../../pages/matchRoom/context/matchContext';
import { TurnCounter } from '../../pages/matchRoom/components/turnCounter';
import { mockMatchDataContextValue } from '../mocks/matchData';

describe('Turn counter', () => {
  afterEach(() => {
    mockMatchDataContextValue.modifyTurnCount.mockClear();
  });
  it('should call a function to increase turn count when the `add` button is clicked and turn count is lesser than 4', () => {
    render(
      <MatchDataContext.Provider value={mockMatchDataContextValue}>
        <TurnCounter />
      </MatchDataContext.Provider>
    );
    const addTurnFn = mockMatchDataContextValue.modifyTurnCount;
    const button = screen.getByText('+');
    fireEvent.click(button);
    expect(addTurnFn).toHaveBeenCalledWith('add');
  });
  it('should call a function to decrease turn count when the `subtract` button is clicked and turn count is greater than 1', () => {
    mockMatchDataContextValue.matchData.turningPoint = 2;
    render(
      <MatchDataContext.Provider value={mockMatchDataContextValue}>
        <TurnCounter />
      </MatchDataContext.Provider>
    );
    const addTurnFn = mockMatchDataContextValue.modifyTurnCount;
    const button = screen.getByText('-');
    fireEvent.click(button);
    expect(addTurnFn).toHaveBeenCalledWith('subtract');
  });
  it('should NOT call a function to increase turn count when current turn is 4', () => {
    mockMatchDataContextValue.matchData.turningPoint = 4;
    render(
      <MatchDataContext.Provider value={mockMatchDataContextValue}>
        <TurnCounter />
      </MatchDataContext.Provider>
    );
    const addTurnFn = mockMatchDataContextValue.modifyTurnCount;
    const button = screen.getByText('+');
    fireEvent.click(button);
    expect(addTurnFn).not.toHaveBeenCalled();
  });
  it('should NOT call a function to decrease turn count when current turn is 1', () => {
    mockMatchDataContextValue.matchData.turningPoint = 1;
    render(
      <MatchDataContext.Provider value={mockMatchDataContextValue}>
        <TurnCounter />
      </MatchDataContext.Provider>
    );
    const addTurnFn = mockMatchDataContextValue.modifyTurnCount;
    const button = screen.getByText('-');
    fireEvent.click(button);
    expect(addTurnFn).not.toHaveBeenCalled();
  });
});

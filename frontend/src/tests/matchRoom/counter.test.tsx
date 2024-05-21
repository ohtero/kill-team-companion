import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from '../../pages/matchRoom/components/counter';
import { MatchDataContext } from '../../pages/matchRoom/context/matchContext';
import { mockMatchDataContextValue } from '../mocks/matchData';

describe('Player point counter', () => {
  afterEach(() => {
    mockMatchDataContextValue.modifyPlayerPoints.mockClear();
  });
  it('should create a counter displaying a player point', () => {
    render(
      <MatchDataContext.Provider value={mockMatchDataContextValue}>
        <Counter points={3} playerIndex={1} pointType="cp" />
      </MatchDataContext.Provider>
    );
    const points = screen.getByRole('player-points');
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

  it('should NOT  call the subtract function if point value is 0', () => {
    render(
      <MatchDataContext.Provider value={mockMatchDataContextValue}>
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

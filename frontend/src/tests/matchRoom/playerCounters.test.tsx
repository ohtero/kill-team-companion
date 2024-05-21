import { it, expect, describe } from 'vitest';
import { screen, render, fireEvent } from '../testUtils';
import { MatchDataProvider } from '../../pages/matchRoom/context/matchContext';
import { PlayerCounters } from '../../pages/matchRoom/components/playerCounters';

describe('Player counters', () => {
  beforeEach(() => {
    render(
      <MatchDataProvider>
        <PlayerCounters />
      </MatchDataProvider>
    );
  });

  it('renders nameplates, Command, and Victory Point counters for each player that has a name supplied', async () => {
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
  it('should add points when context functions are called', () => {
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
  it('should subtract points if a point count is greater than 0', () => {
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

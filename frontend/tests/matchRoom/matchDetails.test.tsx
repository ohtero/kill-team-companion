import { it, expect, describe } from 'vitest';
import { screen, render } from '../testUtils';
import { MatchDataProvider } from '../../src/pages/matchRoom/context/matchContext';
import { MatchDetails } from '../../src/pages/matchRoom/features/matchDetails';
describe('Match details', () => {
  beforeEach(() => {
    render(
      <MatchDataProvider>
        <MatchDetails />
      </MatchDataProvider>
    );
  });

  it('renders the match name, ID and players provided by the MatchDataContext', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'default name'
    );
    expect(
      screen.getByRole('paragraph', { name: 'matchId' })
    ).toHaveTextContent('abcde12345');
    expect(
      screen.getByRole('listitem', { name: 'player1Name' })
    ).toHaveTextContent('player1');
    expect(
      screen.getByRole('listitem', { name: 'player2Name' })
    ).toHaveTextContent('player2');
    expect(
      screen.getByRole('listitem', { name: 'player3Name' })
    ).toHaveTextContent('player3');
    expect(
      screen.getByRole('listitem', { name: 'player4Name' })
    ).toHaveTextContent('player4');
  });
});

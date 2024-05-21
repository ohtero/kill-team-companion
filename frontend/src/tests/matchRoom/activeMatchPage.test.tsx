import { render, screen } from '../testUtils';
import { MatchEntry } from '../../pages/matchRoom/features/matchEntry';
import { mockMatchData } from '../mocks/matchData';
import { MatchFeaturesView } from '../../pages/matchRoom/components/matchFeaturesView';

describe('Main container for an active match screen', () => {
  it('should render match entry if player was not found in current match', () => {
    const playerInMatch = false;

    render(
      <>
        {!playerInMatch ? (
          <MatchEntry
            matchId={'matchId'}
            matchData={mockMatchData}
            localNameData={'name'}
            playerInMatch={true}
            matchIsFull={false}
            updatePlayerInMatch={vi.fn()}
            updateMatchIsFull={vi.fn()}
          ></MatchEntry>
        ) : (
          <MatchFeaturesView />
        )}
      </>
    );
    expect(screen.getByText(/match lobby/i)).toBeInTheDocument();
  });
  it('should render matchFeaturesView if player is in current match', () => {
    const playerInMatch = true;

    render(
      <>
        {!playerInMatch ? (
          <MatchEntry
            matchId={'matchId'}
            matchData={mockMatchData}
            localNameData={'name'}
            playerInMatch={true}
            matchIsFull={false}
            updatePlayerInMatch={vi.fn()}
            updateMatchIsFull={vi.fn()}
          ></MatchEntry>
        ) : (
          <MatchFeaturesView />
        )}
      </>
    );
    expect(screen.getByTestId('feature-view-wrapper')).toBeInTheDocument();
  });
});

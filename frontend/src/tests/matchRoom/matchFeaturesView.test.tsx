import { it } from 'vitest';
import { fireEvent, render, screen } from '../testUtils';
import { MatchFeaturesView } from '../../pages/matchRoom/components/matchFeaturesView';

describe('Match feature view', () => {
  it('should render match details when match view is opened for the first time', () => {
    render(<MatchFeaturesView />);
    const details = screen.getByText(/match id/i);
    expect(details).toBeInTheDocument();
  });
  it('should render match details when `match` tab is clicked', () => {
    render(<MatchFeaturesView />);
    const button = screen.getByText(/^match$/i);
    fireEvent.click(button);
    const details = screen.getByText(/match id/i);
    expect(details).toBeInTheDocument();
  });
  it('should render match counters when `Counters` tab is clicked', () => {
    render(<MatchFeaturesView />);
    const button = screen.getByText(/counters/i);
    fireEvent.click(button);
    const turnCounter = screen.getByText(/turning point/i);
    const playerCounters = screen.getByText(/player points/i);
    expect(turnCounter).toBeInTheDocument();
    expect(playerCounters).toBeInTheDocument();
  });
  it('should render mission details when `Mission` tab is clicked', () => {
    render(<MatchFeaturesView />);
    const button = screen.getByText(/mission/i);
    fireEvent.click(button);
    const missionText = screen.getByText(/nothing here yet/i);
    expect(missionText).toBeInTheDocument();
  });
});

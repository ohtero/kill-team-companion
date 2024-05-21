import { it, expect, describe } from 'vitest';
import { screen, render, fireEvent, waitFor } from '../testUtils';
import { NameInputForm } from '../../pages/matchRoom/components/nameInputForm';
import { SubmitHandler } from 'react-hook-form';
import { MatchEntryFormInput } from '../../pages/matchRoom/types';

describe('Display name input form', () => {
  it('should call the onSUbmit function on successful validation', async () => {
    const mockAddPlayerDisplayName: SubmitHandler<MatchEntryFormInput> =
      vi.fn();
    render(
      <NameInputForm
        matchId="abcde12345"
        matchIsFull={false}
        onTestSubmit={mockAddPlayerDisplayName}
      />
    );
    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: 'testUser' }
    });
    fireEvent.submit(screen.getByRole('button', { name: /confirm name/i }));
    await waitFor(() => {
      expect(mockAddPlayerDisplayName).toHaveBeenCalled();
    });
  });
  it('should show validation error on empty input field', async () => {
    render(<NameInputForm matchId="abcde12345" matchIsFull={false} />);
    fireEvent.submit(screen.getByRole('button', { name: /confirm name/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });
  it('should show validation error on too long name', async () => {
    render(<NameInputForm matchId="abcde12345" matchIsFull={false} />);
    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: 'this name is over twenty characters long' }
    });
    fireEvent.submit(screen.getByRole('button', { name: /confirm name/i }));
    expect(await screen.findByText(/name is too long/i)).toBeInTheDocument();
  });
});

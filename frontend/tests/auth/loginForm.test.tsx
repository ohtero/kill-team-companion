import { it, expect, describe } from 'vitest';
import { render, fireEvent, screen } from '../testUtils';
import { LoginForm } from '../../src/pages/signIgn/features/loginForm';

describe('Login form', () => {
  beforeEach(() => {
    render(<LoginForm />);
  });
  it('renders an error message if username is empty when submitted', async () => {
    const usernameInput = screen.getByLabelText('Username');
    const submitBtn = screen.getByRole('button', { name: /sign in/i });
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByTestId(/username/i)).toHaveTextContent(
      'Enter username'
    );
  });
  it('renders an error message if password is empty when submitted', async () => {
    const usernameInput = screen.getByLabelText('Username');
    const submitBtn = screen.getByRole('button', { name: /sign in/i });
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByTestId(/password/i)).toHaveTextContent(
      'Enter password'
    );
  });
});

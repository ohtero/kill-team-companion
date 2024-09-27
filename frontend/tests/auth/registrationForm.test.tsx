import { it, expect, describe } from 'vitest';
import { render, screen, fireEvent } from '../testUtils';
import { RegistrationForm } from '../../src/pages/signIgn/features/registerForm';

describe('User registration form', () => {
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    render(<RegistrationForm />);
    submitBtn = screen.getByRole('button', { name: /register/i });
  });
  describe('Username input', () => {
    let usernameInput: HTMLInputElement;
    beforeEach(() => {
      usernameInput = screen.getByLabelText(/username/i);
    });
    it('should render error if username is left empty', async () => {
      fireEvent.change(usernameInput, { target: { value: '' } });
      fireEvent.click(submitBtn);
      expect(await screen.findByTestId(/username/i)).toHaveTextContent(
        'Username is required'
      );
    });
    it('should render error if other that alphanumeric characters are used', async () => {
      fireEvent.change(usernameInput, { target: { value: '!"$' } });
      fireEvent.click(submitBtn);
      expect(await screen.findByTestId(/username/i)).toHaveTextContent(
        'Only characters a-z and 0-9 allowed'
      );
    });
    it('should render error if length is more than 16', async () => {
      fireEvent.change(usernameInput, {
        target: { value: 'thisusernameistoodamnlong' }
      });
      fireEvent.click(submitBtn);
      expect(await screen.findByTestId(/username/i)).toHaveTextContent(
        'Username maximum length is 16 characters'
      );
    });
  });
  describe('Email input', () => {
    let emailInput: HTMLInputElement;
    beforeEach(() => {
      emailInput = screen.getByLabelText(/email/i);
    });
    it('should render error if email is left empty', async () => {
      fireEvent.change(emailInput, { target: { value: '' } });
      fireEvent.click(submitBtn);
      expect(await screen.findByTestId(/email/i)).toHaveTextContent(
        'Email is required'
      );
    });
    it('should render error if email is not in proper format', async () => {
      fireEvent.change(emailInput, { target: { value: '!!!' } });
      fireEvent.click(submitBtn);
      expect(await screen.findByTestId(/email/i)).toHaveTextContent(
        'Email is not valid'
      );
    });
  });
  describe('Password input', () => {
    let passwordInput: HTMLInputElement;
    beforeEach(() => {
      passwordInput = screen.getByLabelText(/^password$/i);
    });
    it('should render error if password is left empty', async () => {
      fireEvent.change(passwordInput, { target: { value: '' } });
      fireEvent.click(submitBtn);
      expect(await screen.findByTestId(/^password$/i)).toHaveTextContent(
        'Password is required'
      );
    });
    it('should render error if password is not at least 12 characters', async () => {
      fireEvent.change(passwordInput, { target: { value: 'abcd' } });
      fireEvent.click(submitBtn);
      expect(await screen.findByTestId(/^password$/i)).toHaveTextContent(
        'Password must be at least 12 characters long'
      );
    });
    it('should render error if password contains whitespace', async () => {
      fireEvent.change(passwordInput, { target: { value: 'aaaabb bbcccc' } });
      fireEvent.click(submitBtn);
      expect(await screen.findByTestId(/^password$/i)).toHaveTextContent(
        'Password must not contain any whitespace'
      );
    });
  });
  describe('Password confirmation input', () => {
    let confirmationInput: HTMLInputElement;
    beforeEach(() => {
      confirmationInput = screen.getByLabelText(/^confirm password$/i);
    });
    it('should render error if password confirmation is left empty', async () => {
      fireEvent.change(confirmationInput, { target: { value: '' } });
      fireEvent.click(submitBtn);
      expect(
        await screen.findByTestId(/^passwordConfirmation$/i)
      ).toHaveTextContent('Confirm your password');
    });
    it('should render error if passwords do not match', async () => {
      fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: 'correctPassword' }
      });
      fireEvent.change(confirmationInput, {
        target: { value: 'wrongPassword' }
      });
      fireEvent.click(submitBtn);
      expect(
        await screen.findByTestId(/^passwordConfirmation$/i)
      ).toHaveTextContent('Passwords do not match');
    });
  });
});

import {
  checkUsernameAvailability,
  hashPassword,
  validateRegistrationInputs
} from '@services/utils/authUtils.js';
import * as argon2 from 'argon2';
import { AppError } from '@classExtensions/errorExtension.js';
import { PoolClient } from 'pg';
import { MockedFunction } from 'vitest';

describe('password hashing', () => {
  vi.mock('argon2', () => ({
    hash: vi.fn()
  }));
  test('should resolve and return a hashed password', async () => {
    vi.mock('@services/utils/authUtils.js', { spy: true });
    const actualArgon2 = await vi.importActual('argon2');
    vi.mocked(argon2.hash).mockImplementation(
      actualArgon2.hash as typeof argon2.hash
    );
    const hash = await hashPassword('password');
    expect(hash).toBeTypeOf('string');
    expect(hashPassword).toHaveResolved();
  });
  test('should throw and propagate an AppError if hashing fails', async () => {
    vi.mocked(argon2.hash).mockRejectedValue(new Error('argon2 error'));
    await expect(hashPassword('password')).rejects.toThrow(AppError);
  });
});

describe('username availability check', () => {
  const mockClient = {
    query: vi
      .fn()
      .mockResolvedValue({ rows: [{ exists: false }] }) as MockedFunction<
      () => Promise<{ rows: { exists: boolean }[] }>
    >,
    release: vi.fn()
  } as unknown as PoolClient;
  const username = 'user';
  const email = 'user@domain.com';
  test('should return True if name is not found in db', async () => {
    const result = await checkUsernameAvailability(username, email, mockClient);
    expect(result).toBe(true);
  });
  test('should return False if name exists in db', async () => {
    vi.mocked(mockClient.query).mockResolvedValue({ rows: [{ exists: true }] });
    const result = await checkUsernameAvailability(username, email, mockClient);
    expect(result).toBe(false);
  });
  test('should throw and propagate an AppError if db query fails', async () => {
    vi.mocked(mockClient.query).mockRejectedValue(new Error());
    await expect(
      checkUsernameAvailability(username, email, mockClient)
    ).rejects.toThrow(AppError);
  });
});

describe('input validation', () => {
  const mockData = {
    username: 'validUsername',
    password: 'validPassword',
    email: 'user@domain.com'
  };
  test('should return True if all validations pass', () => {
    expect(validateRegistrationInputs(mockData)).toBe(true);
  });
  test('should fail the username validation if username contains other than alphanumeric characters', () => {
    mockData.username = 'notValid!@#$';
    expect(validateRegistrationInputs(mockData)).toBe(false);
  });
  test('should fail the username validation if username is empty', () => {
    mockData.username = '';
    expect(validateRegistrationInputs(mockData)).toBe(false);
  });
  test('should fail the username validation if username is too long', () => {
    mockData.username = 'thisUsernameIsOver16Characters';
    expect(validateRegistrationInputs(mockData)).toBe(false);
  });
  test('should return False if email is not in email format', () => {
    mockData.email = 'notAnEmail';
    expect(validateRegistrationInputs(mockData)).toBe(false);
  });
  test('should return False if password is empty', () => {
    mockData.password = '';
    expect(validateRegistrationInputs(mockData)).toBe(false);
  });
  test('should return False if password is shorter than 3 characters', () => {
    mockData.password = 'ab';
    expect(validateRegistrationInputs(mockData)).toBe(false);
  });
});

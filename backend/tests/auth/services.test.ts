import { insertUserToDb } from '@services/authServices.js';
import { AppError } from '@classExtensions/errorExtension.js';
import { PoolClient } from 'pg';
import {
  checkUsernameAvailability,
  hashPassword,
  validateRegistrationInputs
} from '@services/utils/authUtils.js';

describe('New user creation', () => {
  const mockClient = {
    query: vi.fn(),
    release: vi.fn()
  } as unknown as PoolClient;
  const mockData = {
    username: 'validUsername',
    password: 'validPassword',
    email: 'user@domain.com'
  };
  vi.mock('@services/utils/authUtils.js', () => ({
    hashPassword: vi.fn(),
    checkUsernameAvailability: vi.fn(),
    validateRegistrationInputs: vi.fn()
  }));
  beforeEach(() => {
    vi.mocked(hashPassword).mockResolvedValue('hashedPassword');
    vi.mocked(checkUsernameAvailability).mockResolvedValue(true);
    vi.mocked(validateRegistrationInputs).mockResolvedValue(true);
  });
  test('should return success if all checks pass', async () => {
    const result = await insertUserToDb(mockClient, mockData);
    expect(result).toBe('user creation success');
  });
  test('should throw an AppError if hashing fails', async () => {
    vi.mocked(hashPassword).mockRejectedValue(new AppError('internalError'));
    await expect(insertUserToDb(mockClient, mockData)).rejects.toThrow(
      AppError
    );
  });
  test('should return duplicateError if username is not available', async () => {
    vi.mocked(hashPassword).mockResolvedValue('hashedPassword');
    vi.mocked(checkUsernameAvailability).mockResolvedValue(false);
    const result = await insertUserToDb(mockClient, mockData);
    expect(result).toBeInstanceOf(AppError);
    expect(result).toHaveProperty('name', 'duplicateError');
  });
  test('should return validationError if input validation fails', async () => {
    vi.mocked(validateRegistrationInputs).mockReturnValue(false);
    const result = await insertUserToDb(mockClient, mockData);
    console.log(result);
    expect(result).toBeInstanceOf(AppError);
    expect(result).toHaveProperty('name', 'validationError');
  });
});

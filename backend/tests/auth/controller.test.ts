import { registerUser } from '../../src/API/controllers/authController.js';
import { AppError } from '@classExtensions/errorExtension.js';
import { insertUserToDb } from '@services/authServices.js';
import { Request, Response } from 'express';

describe('user registration', () => {
  const mockReq = {
    dbCLient: {},
    body: {
      registrationData: {
        username: 'username',
        password: 'password',
        email: 'user@domain.com'
      }
    }
  } as unknown as Request;

  const mockRes = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  } as unknown as Response;

  vi.mock('@services/authServices.js', () => ({
    insertUserToDb: vi.fn()
  }));

  test('should respond with status 200 and message `Registration successful` if inserting user into db is successful', async () => {
    vi.mocked(insertUserToDb).mockResolvedValue('user creation success');
    await registerUser(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith('Registration successful');
  });
  test('should respond with status 400 and message `Invalid input or action.` if inserting user into db fails due to expected operational error', async () => {
    vi.mocked(insertUserToDb).mockResolvedValue(new AppError('internalError'));
    await registerUser(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith('Invalid input or action.');
  });
  test(`should respond with status 500 and message 'Something went wrong. Try again later' if encountering unexpected error`, async () => {
    vi.mocked(insertUserToDb).mockRejectedValue(new AppError('internalError'));
    await registerUser(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      'Something went wrong. Try again later.'
    );
  });
});

import { Request } from 'express';
import {
  hashPassword,
  validateRegistrationInputs,
  checkUsernameAvailability
} from './utils/authUtils.js';
import { AppError } from '../classExtensions/errorExtension.js';

export async function insertUserToDb(
  dbClient: Request['dbClient'],
  registrationData: Request['body']['registrationData']
): Promise<string | AppError> {
  const client = dbClient;
  try {
    const hashedPassword = await hashPassword(registrationData.password);
    const validInputs = validateRegistrationInputs(registrationData);
    const usernameAvailable = await checkUsernameAvailability(
      registrationData.username,
      registrationData.email,
      client
    );
    const queryStr = {
      text: 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      values: [
        registrationData.username,
        registrationData.email,
        hashedPassword
      ]
    };
    if (!validInputs) {
      return new AppError('validationError');
    }
    if (!usernameAvailable) {
      return new AppError('duplicateError');
    }
    await client?.query(queryStr);
    return 'user creation success';
  } catch (error) {
    console.error('Error while inserting new user to database:', error);
    throw new AppError('internalError');
  } finally {
    client?.release();
  }
}

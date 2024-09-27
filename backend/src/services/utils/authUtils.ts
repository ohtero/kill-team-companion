import { RegistrationData } from '../../types/express/express.js';
import { Request } from 'express';
import * as argon2 from 'argon2';
import { AppError } from '../../classExtensions/errorExtension.js';

export async function hashPassword(password: string): Promise<string> {
  try {
    const hash = await argon2.hash(password, {
      memoryCost: 47104,
      timeCost: 2,
      parallelism: 1
    });
    return hash;
  } catch (error) {
    console.error('Error while hashing password: ', error);
    throw new AppError('internalError');
  }
}

export async function checkUsernameAvailability(
  username: string,
  email: string,
  client: Request['dbClient']
): Promise<boolean> {
  try {
    const dbRes = await client?.query<{ exists: boolean }>(
      'SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 OR email = $2 ) AS exists',
      [username, email]
    );
    const exists = dbRes?.rows[0]?.exists;
    if (exists) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(
      'Error while querying database for username availability: ',
      error
    );
    throw new AppError('internalError');
  }
}

export function validateRegistrationInputs(
  inputData: RegistrationData
): boolean {
  const usernamePattern = /^[a-z0-9]{1,16}$/i;
  const emailPattern = /\S+@\S+\.\S+/;
  const passwordPattern = /^\S{3,}$/;

  if (
    !usernamePattern.test(inputData.username) ||
    !emailPattern.test(inputData.email) ||
    !passwordPattern.test(inputData.password)
  ) {
    return false;
  }

  return true;
}

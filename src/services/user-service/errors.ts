import { Conflict } from 'http-errors';

// TODO: create error codes and other details.
// e.g.:
// errorCode = 'EXISTING_USER'
// errorParams = { username: 'JohnDoe' }
export const userAlreadyExistsError = new Conflict('User already exists');

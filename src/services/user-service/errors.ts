import { HttpError } from 'routing-controllers';

// TODO: create error codes and other details.
// e.g.:
// errorCode = 'EXISTING_USER'
// errorParams = { username: 'JohnDoe' }
class ConflictError extends HttpError {
  constructor(message?: string) {
    super(409, message ?? 'Conflict');
  }
}

export const userAlreadyExistsError = new ConflictError('User already exists');

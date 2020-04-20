import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  BadRequestError,
} from 'routing-controllers';
import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

class HttpValidationError extends BadRequestError {
  errors: ValidationError[];

  constructor(message: string, errors: ValidationError[]) {
    super(message);
    this.errors = errors;
    this.name = 'VALIDATION_ERROR';
  }
}

@Middleware({ type: 'after' })
export class ValidationErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response, next: NextFunction) {
    if (
      error instanceof BadRequestError &&
      Array.isArray((error as any).errors) &&
      typeof error?.message === 'string' &&
      error.message.startsWith('Invalid body')
    ) {
      next(
        new HttpValidationError(
          'Data is not valid.',
          (error as any).errors as ValidationError[],
        ),
      );
    }

    next(error);
  }
}

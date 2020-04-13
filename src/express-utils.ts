import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { UnprocessableEntity } from 'http-errors';

type Handler = (req: Request, res: Response, next: NextFunction) => void;

export class ServiceValidationError extends UnprocessableEntity {
  errors: ValidationError[];

  constructor(errors: ValidationError[], msg?: string) {
    super(msg || 'validation error');
    this.errors = errors;
  }
}

export function handleAsyncErrors(cb: Handler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}

export function checkValidationErrors(errorMsg?: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ServiceValidationError(errors.array(), errorMsg);
    }

    next();
  };
}

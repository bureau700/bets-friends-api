import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
  InternalServerError,
} from 'routing-controllers';
import { Request, Response } from 'express';

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: unknown, request: Request, response: Response) {
    if (error instanceof HttpError) {
      response.status(error.httpCode).json(error);
      return;
    }

    response.status(500).json(new InternalServerError('Oops!'));
  }
}

import express, { NextFunction, Request, Response } from 'express';
import errorhandler from 'errorhandler';
import * as core from 'express-serve-static-core';
import { Connection } from 'typeorm';
import { HttpError } from 'http-errors';
import { initDatabase } from './database';
import { ServiceValidationError } from './express-utils';
import { publicRouter } from './public-routes';
import { privateRouter } from './private-routes';

export type Application = core.Express & { connection: Connection };

export async function initApp(): Promise<Application> {
  const connection = await initDatabase();

  const app = express();

  app.set('db', connection);

  app.use((req, _res, next) => {
    req.appInstance = app;
    next();
  });

  app.use('/', await publicRouter());

  app.use('/', await privateRouter(app));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error('Error handler: ', err);
    // FIXME: warning shitty hack here!
    if (ServiceValidationError.isInstance(err)) {
      return res.status(err.statusCode).json({
        code: err.statusCode,
        message: err.message,
        detail: err.errors,
      });
    }
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({
        code: err.statusCode,
        message: err.message,
      });
    }
    return res.status(500).json({
      code: 500,
      message: 'Oops! An error occured...',
    });
  });
  app.use(errorhandler());

  (app as Application).connection = connection;

  return app as Application;
}

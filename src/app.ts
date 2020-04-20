import express from 'express';
import * as core from 'express-serve-static-core';
import { Connection } from 'typeorm';
import { useExpressServer } from 'routing-controllers';
import { initDatabase } from './database';
import AuthenticationController from './controllers/user.controller';
import HealthCheckController from './controllers/healthcheck.controller';
import ProfileController from './controllers/profile.controller';
import { ValidationErrorHandler } from './middlewares/validation-error-handler';
import { GlobalErrorHandler } from './middlewares/global-error-handler';
import { createGraphQLServer } from './graphql/server';

export type Application = core.Express & { connection: Connection };

export async function initApp(): Promise<Application> {
  const connection = await initDatabase();

  const app = express();

  app.set('db', connection);

  app.use((req, _res, next) => {
    req.appInstance = app;
    next();
  });

  // app.use(userContext);

  const graphQLServer = await createGraphQLServer();
  graphQLServer.applyMiddleware({ app, disableHealthCheck: true });

  useExpressServer(app, {
    controllers: [
      AuthenticationController,
      HealthCheckController,
      ProfileController,
    ],
    middlewares: [ValidationErrorHandler, GlobalErrorHandler],
    classTransformer: true,
    defaultErrorHandler: false,
  });

  // app.use((err: any, req: Request, res: Response) => {
  //   if (err instanceof HttpError) {
  //     return res.status(err.httpCode).json({
  //       code: err.httpCode,
  //       message: err.message,
  //     });
  //   }

  //   // console.log(res);

  //   return res.status(500).json({
  //     code: 500,
  //     message: 'Oops! An error occured...',
  //   });
  // });

  (app as Application).connection = connection;

  return app as Application;
}

import express from 'express';
import errorhandler from 'errorhandler';
import * as core from 'express-serve-static-core';
import { Connection } from 'typeorm';
// import passport from 'passport';
import publicRouter from './public-routes';
import privateRouter from './private-routes';
import { initDatabase } from './database';

export type Application = core.Express & { connection: Connection };

export async function initApp(): Promise<Application> {
  const connection = await initDatabase();

  const app = express();
  app.set('db', connection);
  app.use('/', publicRouter);
  app.use('/', privateRouter);
  app.use(errorhandler());

  (app as Application).connection = connection;

  return app as Application;
}

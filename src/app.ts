import express from 'express';
import router from './routes';
import { initDatabase } from './database';
import { UserService } from './services/user-service';
import errorhandler from 'errorhandler';
import * as core from 'express-serve-static-core';
import { Connection } from 'typeorm';

export type Application = core.Express & { connection: Connection };

export async function initApp(): Promise<Application> {
  const connection = await initDatabase();

  const app = express();
  app.use('/', router);
  app.set('db', connection);
  app.use(errorhandler());

  (app as Application).connection = connection;

  return app as Application;
}

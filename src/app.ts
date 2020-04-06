import express from 'express';
import router from './routes';
import { initDatabase } from './database';

export async function initApp() {
  const connection = await initDatabase();

  const app = express();
  app.use('/', router);
  app.set('db', connection);

  return app;
}

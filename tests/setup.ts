import path from 'path';
import { loadFixtures } from './fixtures-loader';
import { cleanDatabase } from './db-cleaner';

export default async function() {
  // eslint-disable-next-line global-require
  require('dotenv').config({
    path: path.resolve(__dirname, '..', '.env'),
  });
  process.env.NODE_ENV = 'test';

  await cleanDatabase();
  await loadFixtures();
}

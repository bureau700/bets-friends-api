import path from 'path';
import { loadFixtures } from './fixtures-loader';
import fs from 'fs';

export default async function() {
  require('dotenv').config({
    path: path.resolve(__dirname, '..', '.env'),
  });
  process.env.NODE_ENV = 'test';

  // await loadFixtures();
}

import 'reflect-metadata';
import path from 'path';
import { createConnection, ConnectionOptions } from 'typeorm';

export async function initDatabase() {
  const dbOptions: ConnectionOptions =
    process.env.NODE_ENV === 'test'
      ? {
          type: 'postgres',
          url: process.env.DATABASE_URL + '-test',
          logging: ['error'],
        }
      : {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          logging: ['query', 'error'],
        };

  const connection = await createConnection({
    ...dbOptions,
    entities: [path.join(__dirname, 'entity', '*.ts')],
  });

  return connection;
}

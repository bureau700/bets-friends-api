import 'reflect-metadata';
import path from 'path';
import { createConnection, ConnectionOptions } from 'typeorm';

export async function initDatabase() {
  const dbOptions: ConnectionOptions =
    process.env.NODE_ENV === 'test'
      ? {
          type: 'sqlite',
          database: './db.sqlite',
          logging: false,
        }
      : {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          entities: [path.join(__dirname, 'model', '*.ts')],
          logging: ['query', 'error'],
        };

  try {
    const connection = await createConnection({
      ...dbOptions,
      entities: [path.join(__dirname, 'model', '*.ts')],
    });

    return connection;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

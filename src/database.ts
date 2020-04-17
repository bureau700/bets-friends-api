import 'reflect-metadata';
import path from 'path';
import { createConnection, ConnectionOptions } from 'typeorm';
import { userService } from './services/user-service';

export async function initDatabase() {
  const dbOptions: ConnectionOptions =
    process.env.NODE_ENV === 'test'
      ? {
          type: 'postgres',
          url: `${process.env.DATABASE_URL}-test`,
          logging: ['error'],
        }
      : {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          logging: ['query', 'error'],
          synchronize: true,
        };

  const connection = await createConnection({
    ...dbOptions,
    entities: [path.join(__dirname, 'entity', '*.ts')],
  });

  try {
    await userService.createUser({
      username: 'neolitec',
      password: 'totoplop',
    });
  } catch {
    console.log('User already exists');
  }

  return connection;
}

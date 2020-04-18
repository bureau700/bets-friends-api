import 'reflect-metadata';
import path from 'path';
import { createConnection, ConnectionOptions } from 'typeorm';

export async function initDatabase() {
  console.log(`Using database ${process.env.DATABASE_URL} ...`);

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

  // To create a test user.
  // try {
  //   await userService.createUser({
  //     username: 'neolitec',
  //     password: 'totoplop',
  //   });
  // } catch {
  //   console.log('User already exists');
  // }

  return connection;
}

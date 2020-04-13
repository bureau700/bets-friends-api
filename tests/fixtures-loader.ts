/* eslint-disable no-await-in-loop */

import path from 'path';
import {
  Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver,
} from 'typeorm-fixtures-cli/dist';
import { createConnection, Connection, BaseEntity } from 'typeorm';

export async function loadFixtures() {
  let connection: Connection | null = null;

  const fixturesPath = path.join(__dirname, 'fixtures');

  try {
    connection = await createConnection({
      type: 'postgres',
      url: `${process.env.DATABASE_URL}-test`,
      logging: ['error'],
      entities: [
        // FIXME: try to use src instead of dist...
        path.join(__dirname, '..', 'dist', 'src', 'entity', '*.js'),
      ],
    });
    await connection.synchronize(true);

    const loader = new Loader();
    loader.load(path.resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);

    const builder = new Builder(connection, new Parser());

    // eslint-disable-next-line no-restricted-syntax
    for (const fixture of fixturesIterator(fixtures)) {
      const entity = await builder.build(fixture);
      await (entity as BaseEntity).save();
    }
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

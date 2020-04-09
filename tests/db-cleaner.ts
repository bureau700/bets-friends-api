import { Client } from 'pg';

export async function cleanDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL + '-test',
  });
  await client.connect();

  const result = await client.query(`
    SELECT
      *
    FROM
      pg_catalog.pg_tables
    WHERE
      schemaname != 'pg_catalog'
    AND schemaname != 'information_schema';
  `);

  console.log(result);

  const tables = result.rows.map(row => row.tablename);
  try {
    await client.query(`DROP TABLE ${tables.join(', ')} CASCADE;`);
  } catch (err) {
    console.error(err);
  }

  await client.end();
}

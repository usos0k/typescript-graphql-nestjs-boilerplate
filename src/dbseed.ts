import 'reflect-metadata';

import { createConnection, getMetadataArgsStorage } from 'typeorm';

import { User } from './models';

async function main() {
  const connection = await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'ggomma',
    password: 'test',
    database: 'test',
    synchronize: true,
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
  });

  const user1 = new User({
    email: 'test1@test.com',
    password: 'test123',
    name: 'test1',
  });
  const user2 = new User({
    email: 'test2@test.com',
    password: 'test123',
    name: 'test2',
  });

  await connection.manager.save(user1);
  await connection.manager.save(user2);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

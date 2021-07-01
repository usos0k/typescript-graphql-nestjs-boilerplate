import 'reflect-metadata';

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USERNAME,
} from '@/environments';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { Logger } from '@nestjs/common';
import { createConnection, getMetadataArgsStorage } from 'typeorm';

async function main() {
  const connection = await createConnection({
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    dropSchema: true,
  });
  const password = 'test123!';

  const user = new UserEntity();
  user.email = `auto-${1}@test.com`;
  user.name = `auto-${1}name`;
  user.password = password;

  await connection.manager.save(user);
  Logger.log('inserted', 'user');

  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

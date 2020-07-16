import {
  MYSQL_DB,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USERNAME,
} from '@/environments';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      type: 'mysql',
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      username: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      database: MYSQL_DB,
      synchronize: true,
      autoLoadEntities: true,
      keepConnectionAlive: true,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    };
    return options;
  }
}

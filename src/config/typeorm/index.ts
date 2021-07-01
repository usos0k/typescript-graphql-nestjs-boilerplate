import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import config from '../../config.orm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options = {
      ...config,
      synchronize: true,
      autoLoadEntities: true,
      keepConnectionAlive: true,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    };
    return options;
  }
}

import { join } from 'path';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { GraphqlService, TypeOrmConfigService } from '@/config';
import * as Modules from '@/modules';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ...Object.values(Modules),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

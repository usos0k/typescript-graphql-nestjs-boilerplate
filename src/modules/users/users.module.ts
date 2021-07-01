import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository])
  ],
  controllers: [],
  providers: [
    UsersService,
    UsersResolver,
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}

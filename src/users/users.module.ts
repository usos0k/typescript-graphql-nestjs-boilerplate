import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './repositories/user.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}

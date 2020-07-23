import { Auth } from '@/graphql';
import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserRO } from '../users/interfaces/user.interface';
import { CurrentUser } from './auth.decorator';
import { GqlAuthJwtGuard, GqlAuthLocalGuard } from './guards';

@Resolver('Auth')
export class AuthResolver {
  @UseGuards(GqlAuthLocalGuard)
  @Mutation('login')
  async login(@CurrentUser() user: UserRO): Promise<Auth> {
    return {
      user,
      token: user.token,
    };
  }

  @Query('whoami')
  @UseGuards(GqlAuthJwtGuard)
  async whoAmI(@CurrentUser() user: UserRO): Promise<UserRO> {
    return user;
  }
}

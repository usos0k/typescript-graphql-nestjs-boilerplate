import { UsersConnection } from '@/graphql';
import { convertListDataToConnectionPagination } from '@/utils/paginationUtils';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreateUserDto,
  FindUserDto,
  FindUsersCursorAtDto,
  FindUsersPaginationDto,
} from './dto';
import { UserRO } from './interfaces';
import { CursorAtValidationPipe, PaginationValidationPipe } from './pipes';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('user')
  async getUser(
    @Args('input') input: FindUserDto,
  ): Promise<UserRO | undefined> {
    const user = await this.usersService.findUser(input);
    return user.toResponseObject();
  }

  @Query('users')
  async getUsers(
    @Args('pagination', PaginationValidationPipe)
    pagination: FindUsersPaginationDto,
    @Args('cursorAt', CursorAtValidationPipe) cursor: FindUsersCursorAtDto,
  ): Promise<UsersConnection | null> {
    const { users, total } = await this.usersService.findUsers({
      pagination,
      cursor,
    });

    return convertListDataToConnectionPagination<UserRO>({
      list: users.map((user) => user.toResponseObject()),
      total,
      cursorAt: cursor.at,
      pagination: pagination,
    });
  }

  @Mutation('createUser')
  async createUser(@Args('input') data: CreateUserDto): Promise<UserRO> {
    const user = await this.usersService.register(data);
    return user.toResponseObject();
  }
}

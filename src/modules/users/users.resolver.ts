import { CURSOR_AT_MAP } from '@/config';
import {
  Auth,
  FindUserInput,
  PageInfo,
  PaginationInput,
  UsersConnection,
} from '@/graphql';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { FindUsersPaginationDto } from './dto/find-users.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('user')
  async getUser(
    @Args('input') input: FindUserInput,
  ): Promise<UserEntity | undefined> {
    const query = new FindUserDto(input);
    return this.usersService.findUser(query);
  }

  @Query('users')
  async getUsers(
    @Args('pagination') pagination: PaginationInput,
  ): Promise<UsersConnection | null> {
    const findUsersPaginationDto = new FindUsersPaginationDto(pagination);
    const { users, total } = await this.usersService.findUsers({
      pagination: findUsersPaginationDto,
    });

    const cursor = CURSOR_AT_MAP[pagination.cursorAt || 'ID'];

    const edges = users.map((user) => ({
      node: { ...user, id: `${user.id}` },
      cursor: `${user[cursor]}`,
    }));

    const pageInfo: PageInfo = {
      endCursor: users[users.length - 1][cursor],
      startCursor: users[0][cursor],
      hasNextPage: false,
      hasPreviousPage: false,
    };
    if (total === users.length) {
      pageInfo.hasNextPage = false;
      pageInfo.hasPreviousPage = false;
    } else if (pagination.last) {
      pageInfo.hasPreviousPage = true;
      pageInfo.hasNextPage = false;
    } else {
      pageInfo.hasNextPage = true;
      pageInfo.hasPreviousPage = false;
    }

    return {
      edges,
      pageInfo,
      totalCount: total,
    };
  }

  @Mutation('createUser')
  async createUser(@Args('input') data: CreateUserDto): Promise<UserEntity> {
    return this.usersService.register(data);
  }

  @Mutation('login')
  async login(@Args('input') data: LoginDto): Promise<Auth> {
    const user = await this.usersService.login(data);

    return {
      user,
      token: user.token!,
    };
  }
}

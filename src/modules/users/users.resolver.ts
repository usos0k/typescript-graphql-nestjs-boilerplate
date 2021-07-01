import {
  FindUserInput,
  CreateUserInput,
  UpdateUserInput,
  UsersConnection,
} from '@/graphql';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindUserDto } from './dto/find-user.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';
import { Logger } from '@nestjs/common';
import { CursorAtDto, CursorAtValidationPipe, PaginationDto, PaginationValidationPipe } from '@/common';
import { convertListDataToConnectionPagination } from '@/utils/paginationUtils';
import { UserRO } from '@/modules/users/interfaces/user.interface';


@Resolver('User')
export class UsersResolver {
  private logger = new Logger('UsersResolver', true);

  constructor(
    private usersService: UsersService
  ) {}

  @Query('user')
  async getUser(
    @Args('input') input: FindUserInput,
  ): Promise<UsersEntity | undefined> {
    this.logger.log('getUser');
    const query = new FindUserDto(input);
    return this.usersService.findUser(query);
  }

  @Query('users')
  async getUsers(
    @Args('pagination', PaginationValidationPipe) pagination: PaginationDto,
    @Args('cursorAt', CursorAtValidationPipe) cursor: CursorAtDto,
  ): Promise<UsersConnection | null> {
    this.logger.log('getUsers');

    const { users, total } = await this.usersService.findUsers({
      pagination,
      cursor,
    });

    return convertListDataToConnectionPagination<UserRO>({
      list: users.map((user) => user),
      total,
      cursorAt: cursor.at,
      pagination,
    });
  }

  @Mutation('createUser')
  async createUser(
    @Args('input') data: CreateUserInput,
  ): Promise<UsersEntity> {
    this.logger.log('createUser');

    return this.usersService.createUser(data);
  }

  @Mutation('updateUser')
  async updateUser(
    @Args('_id') _id: string,
    @Args('input') data: UpdateUserInput,
  ): Promise<UsersEntity> {
    this.logger.log('updateUser');

    const query = new FindUserDto({_id : _id});

    return this.usersService.updateUser(query, data);
  }

  @Mutation('deleteUser')
  async deleteUser(
    @Args('input') input: FindUserInput
  ): Promise<boolean> {
    this.logger.log('deleteUser');

    const query = new FindUserDto(input);

    return this.usersService.deleteUser(query);
  }
}

import { CreateUserInput, User } from '@/graphql';
import { UsersService } from '@/services';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('user')
  async getUser(@Args('_id') _id: string): Promise<User | undefined> {
    return this.usersService.findById(_id);
  }

  @Query('users')
  async getUsers(@Args('offset') offset: number, @Args('limit') limit: number): Promise<Array<User>> {
    return this.usersService.findAll();
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.createOne(input);
  }
}

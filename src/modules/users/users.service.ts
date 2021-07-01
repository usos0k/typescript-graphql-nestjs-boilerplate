import { CursorAtDto, PaginationDto } from '@/common';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersRepository } from './repositories/users.repository';
import { connectionPaginationQueryBuilder } from '@/utils/paginationUtils';
import {
  ApolloError,
  ForbiddenError,
} from 'apollo-server-core'

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService', true);

  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async findUser(query: FindUserDto): Promise<UsersEntity | undefined> {
    this.logger.log('findUser');

    return await this.usersRepository.findOne({
      where: query,
    });
  }

  async findUsers({
    pagination,
    cursor,
  }: {
    pagination: PaginationDto;
    cursor: CursorAtDto;
  }): Promise<{ users: Array<UsersEntity>; total: number }> {
    this.logger.log('findUsers');

    const queryBuilder = connectionPaginationQueryBuilder<UsersEntity>({
      pagination,
      cursorAt: cursor.at,
      repository: this.usersRepository,
    });

    const [users, total] = await queryBuilder.getManyAndCount();

    return { users, total };
  }

  async createUser(data: CreateUserDto): Promise<UsersEntity> {
    this.logger.log('createUser');

    let user = await this.usersRepository.create(data);
    const result = await this.usersRepository.save(user);

    return result;
  }

  async updateUser(
    query : FindUserDto,
    data: UpdateUserDto,
  ): Promise<UsersEntity> {
    this.logger.log('updateUser');

    try {
      let user = await this.usersRepository.findOne({
        where : query
      });

      if (!user) {
        throw new ForbiddenError('User not found.')
      }

      const updateUser = await this.usersRepository.save({
        ...user,
        ...data
      });

      return updateUser;
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  async deleteUser(query: FindUserDto): Promise<boolean> {
    try {
      let user = await this.usersRepository.findOne({
        where : query
      });

      if (!user) {
        throw new ForbiddenError('User not found.')
      }
      const deletedUser = await this.usersRepository.save({
        ...user,
        isDeleted: true,
      });

      return deletedUser ? true : false;
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}

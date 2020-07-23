import { connectionPaginationQueryBuilder } from '@/utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import {
  CreateUserDto,
  FindUserDto,
  FindUsersCursorAtDto,
  FindUsersPaginationDto,
} from './dto';
import { UserEntity } from './entities';
import { UserRepository } from './repositories';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(query: FindUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: query,
    });

    if (!user) return null;
    return user;
  }

  async findUsers({
    pagination,
    cursor,
  }: {
    pagination: FindUsersPaginationDto;
    cursor: FindUsersCursorAtDto;
  }): Promise<{ users: Array<UserEntity>; total: number }> {
    const queryBuilder = connectionPaginationQueryBuilder<UserEntity>({
      pagination,
      cursorAt: cursor.at,
      repository: this.userRepository,
    });

    const [users, total] = await queryBuilder.getManyAndCount();
    return { users, total };
  }

  async register(data: CreateUserDto): Promise<UserEntity> {
    const { email } = data;
    let user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }
}

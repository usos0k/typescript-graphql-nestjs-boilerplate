import { MAX_QUERY_SIZE } from '@/environments';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { FindUsersPaginationDto } from './dto/find-users.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(query: FindUserDto): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      where: query,
    });
  }

  async findUsers({
    pagination,
  }: {
    pagination: FindUsersPaginationDto;
  }): Promise<{ users: Array<UserEntity>; total: number }> {
    const { first, last, after, before, convertedCursorAt } = pagination;

    let queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .orderBy(convertedCursorAt, 'DESC');

    if (after) {
      // queryBuilder = queryBuilder.where(`user.${convertedCursorAt} `);
      queryBuilder = queryBuilder.andWhere(
        `user.${convertedCursorAt} < ${after}`,
      );
    }
    if (before) {
      queryBuilder = queryBuilder.andWhere(
        `user.${convertedCursorAt} > ${before}`,
      );
    }
    if (first) {
      queryBuilder.limit(first > MAX_QUERY_SIZE ? MAX_QUERY_SIZE : first);
    } else if (last) {
      queryBuilder
        .orderBy('ASC')
        .limit(last > MAX_QUERY_SIZE ? MAX_QUERY_SIZE : last)
        .orderBy('DESC');
    } else {
      queryBuilder.limit(MAX_QUERY_SIZE);
    }

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

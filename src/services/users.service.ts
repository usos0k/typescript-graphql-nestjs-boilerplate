import { User } from '@/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(_id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ _id });
  }

  async createOne(createUserInput: Partial<User>): Promise<User> {
    return this.userRepository.save({ ...createUserInput });
  }
}

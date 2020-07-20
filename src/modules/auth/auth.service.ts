import { UsersService } from '@/modules/users/users.service';
import { Injectable, Logger } from '@nestjs/common';

import { UserRO } from '../users/user.interface';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(private usersService: UsersService) {}

  async getUserById(id: string): Promise<UserRO> {
    this.logger.log(`get user by id : ${id}`);

    const user = await this.usersService.findUser({ id });
    if (!user) {
      return null;
    }
    return user.toResponseObject(true);
  }

  async validateUser(email: string, password: string): Promise<UserRO> {
    const user = await this.usersService.findUser({ email });

    if (!user || !(await user.comparePassword(password))) {
      return null;
    }
    return user.toResponseObject(true);
  }
}

import { generateToken } from '@/auth';
import { BCRYPT_SALT } from '@/environments';
import bcrypt from 'bcrypt';
import { IsBoolean, IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserRO } from '../interfaces';

@Entity('users')
export class UserEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @IsNotEmpty()
  password!: string;

  @Column({ default: false })
  @IsBoolean()
  isVerified!: boolean;

  @Column()
  @IsNotEmpty()
  @Length(1, 10)
  name!: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, BCRYPT_SALT);
  }

  async comparePassword(attemptPassword: string): Promise<boolean> {
    return await bcrypt.compare(attemptPassword, this.password);
  }

  toResponseObject(showToken = true): UserRO {
    const responseObject: UserRO = {
      ...this,
      id: `${this._id}`,
      token: undefined,
    };

    if (showToken) responseObject.token = this.token;

    return responseObject;
  }

  private get token(): string {
    return generateToken({
      id: `${this._id}`,
      type: 'accessToken',
    });
  }
}

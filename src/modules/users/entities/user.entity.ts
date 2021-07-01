import { generateToken } from '@/auth';
import { ValidationEntity } from '@/common/entities';
import { BCRYPT_SALT } from '@/environments';
import bcrypt from 'bcrypt';
import { Expose, plainToClass } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ObjectIdColumn,
  Unique,
} from 'typeorm';
import * as uuid from 'uuid';

import { UserRO } from '../interfaces';

export enum IsVerified {
  WAITING = 'WAITING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

@Entity('users')
@Unique(['email'])
export class UserEntity extends ValidationEntity {
  @ObjectIdColumn()
  _id: string;

  @Expose()
  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @IsNotEmpty()
  password!: string;

  @Expose()
  @Column()
  @IsNotEmpty()
  @Length(1, 10)
  name!: string;

  @Column({ nullable: true })
  comment: string;

  @Column('enum', { enum: IsVerified, default: IsVerified.WAITING })
  isVerified!: IsVerified;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column({ default: false })
  isDeleted!: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: string;

  constructor(userEntity?: Partial<UserEntity>) {
    super();
    if (userEntity) {
      Object.assign(
        this,
        plainToClass(UserEntity, userEntity, {
          // excludeExtraneousValues: true,
        }),
      );
      this._id = this._id || uuid.v1();
      // this.createdAt = this.createdAt || +new Date();
      // this.updatedAt = +new Date();
      // this.isVerified = this.isActive !== undefined ? this.isActive : false;
      // this.isActive = this.isActive !== undefined ? this.isActive : true;
    }
  }

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
      token: undefined,
    };

    if (showToken) responseObject.token = this.token;

    return responseObject;
  }

  private get token(): string {
    return generateToken({
      _id: `${this._id}`,
      type: 'accessToken',
    });
  }
}

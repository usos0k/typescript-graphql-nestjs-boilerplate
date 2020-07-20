import { generateToken } from '@/auth';
import { BCRYPT_SALT } from '@/environments';
import bcrypt from 'bcrypt';
import { IsBoolean, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserRO } from '../user.interface';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

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
    const { id, email, name, token } = this;
    const responseObject: UserRO = {
      id: `${id}`,
      email,
      name,
    };

    if (showToken) responseObject.token = token;

    return responseObject;
  }

  private get token(): string {
    return generateToken({
      user: this,
      type: 'accessToken',
    });
  }
}

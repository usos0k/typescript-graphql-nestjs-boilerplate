import { IsPassword } from '@/common';
import { CreateUserInput } from '@/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements CreateUserInput {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @IsPassword()
  password!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;
}

import { IsPassword } from '@/common';
import { AuthInput } from '@/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto implements AuthInput {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @IsPassword()
  password!: string;
}

import { CreateUserInput } from '@/graphql';
import { IsEmail } from 'class-validator';

export class CreateUserDto implements CreateUserInput {
  @IsEmail()
  email!: string;

  password!: string;
  name!: string;
}

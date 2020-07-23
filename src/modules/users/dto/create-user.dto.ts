import { IsPassword } from '@/common';
import { CreateUserInput } from '@/graphql';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class CreateUserDto implements CreateUserInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsPassword()
  password!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name!: string;
}

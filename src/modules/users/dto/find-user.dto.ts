import { FindUserInput } from '@/graphql';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindUserDto implements FindUserInput {
  @Field()
  id?: string;

  @Field()
  email?: string;
}

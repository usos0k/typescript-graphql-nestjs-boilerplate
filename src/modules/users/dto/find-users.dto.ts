import { PaginationInput } from '@/graphql';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindUsersPaginationDto implements PaginationInput {
  @Field()
  first?: number;

  @Field()
  last?: number;

  @Field()
  after?: string;

  @Field()
  before?: string;
}

@ArgsType()
export class FindUsersCursorAtDto {
  @Field()
  at: string;
}

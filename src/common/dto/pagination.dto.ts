import { PaginationInput } from '@/graphql';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationDto implements PaginationInput {
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
export class CursorAtDto {
  @Field()
  at!: string;
}

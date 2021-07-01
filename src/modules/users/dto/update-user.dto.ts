import { UpdateUserInput } from '@/graphql';

export class UpdateUserDto implements UpdateUserInput {
  isDeleted?: boolean;
  title?: string;
}

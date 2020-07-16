import { FindUserInput } from '@/graphql';

export class FindUserDto implements FindUserInput {
  _id?: string;
  email?: string;

  constructor(findUserInput: FindUserInput) {
    Object.assign(this, findUserInput);
  }
}

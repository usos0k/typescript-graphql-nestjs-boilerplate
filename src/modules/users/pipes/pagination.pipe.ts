import { MAX_QUERY_SIZE } from '@/environments';
import { PaginationInput, UsersPaginationCursorAt } from '@/graphql';
import { Injectable, PipeTransform } from '@nestjs/common';

import { FindUsersCursorAtDto, FindUsersPaginationDto } from '../dto';
import { usersPaginationCursorAtMap } from '../interfaces';

@Injectable()
export class PaginationValidationPipe
  implements PipeTransform<PaginationInput, FindUsersPaginationDto> {
  transform(value: PaginationInput): FindUsersPaginationDto {
    if (!value) {
      return { first: MAX_QUERY_SIZE };
    } else {
      const { first, last } = value;
      if (first && last) {
        throw new Error(
          "Passing both 'first' and 'last' to paginate is not supported",
        );
      } else {
        return { ...value };
      }
    }
  }
}

@Injectable()
export class CursorAtValidationPipe
  implements PipeTransform<UsersPaginationCursorAt, FindUsersCursorAtDto> {
  transform(value: UsersPaginationCursorAt): FindUsersCursorAtDto {
    if (!value) {
      return { at: usersPaginationCursorAtMap.ID };
    } else {
      return { at: usersPaginationCursorAtMap[value] };
    }
  }
}

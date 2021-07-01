import { MAX_QUERY_SIZE } from '@/environments';
import { PaginationCursorAt, PaginationInput } from '@/graphql';
import { Injectable, PipeTransform } from '@nestjs/common';

import { CursorAtDto, PaginationDto } from '../dto';

@Injectable()
export class PaginationValidationPipe
  implements PipeTransform<PaginationInput, PaginationDto> {
  transform(value: PaginationInput) {
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
  implements PipeTransform<PaginationCursorAt, CursorAtDto> {
  transform(value: PaginationCursorAt) {
    if (!value) {
      return { at: PaginationCursorAt.ID ? '_id' : '_id' };
    } else {
      if (value === 'ID') {
        return { at: '_id' };
      } else if (value === 'CREATED_AT') {
        return { at: 'createdAt' };
      } else {
        return { at: PaginationCursorAt[value] };
      }
    }
  }
}

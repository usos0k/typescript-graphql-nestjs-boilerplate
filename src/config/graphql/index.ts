import { PaginationCursorAt } from '@/graphql';

export const CURSOR_AT_MAP: { [key in PaginationCursorAt]: string } = {
  ID: 'id',
  CREATED_AT: 'created_at',
};

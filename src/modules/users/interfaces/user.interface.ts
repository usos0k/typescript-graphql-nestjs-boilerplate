import { User, UsersPaginationCursorAt } from '@/graphql';

export interface UserRO extends User {
  token?: string;
}

export const usersPaginationCursorAtMap: {
  [key in UsersPaginationCursorAt]: string;
} = {
  ID: 'admin_id',
  CREATED_AT: 'created_at',
};

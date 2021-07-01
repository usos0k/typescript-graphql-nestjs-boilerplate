
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum PaginationCursorAt {
    ID = "ID",
    CREATED_AT = "CREATED_AT"
}

export class PaginationInput {
    first?: number;
    last?: number;
    after?: string;
    before?: string;
}

export class FindUserInput {
    _id?: string;
}

export class FindUsersInput {
    title?: string;
}

export class CreateUserInput {
    title: string;
}

export class UpdateUserInput {
    isDeleted?: boolean;
    title?: string;
}

export class PageInfo {
    hasNextPage: boolean;
    endCursor?: string;
    hasPreviousPage: boolean;
    startCursor?: string;
}

export class User {
    _id: number;
    isDeleted: boolean;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export abstract class IQuery {
    abstract user(input?: FindUserInput): User | Promise<User>;

    abstract users(pagination?: PaginationInput, cursorAt?: PaginationCursorAt): UsersConnection | Promise<UsersConnection>;
}

export abstract class IMutation {
    abstract createUser(input: CreateUserInput): User | Promise<User>;

    abstract updateUser(_id: string, input: UpdateUserInput): User | Promise<User>;

    abstract deleteUser(input: FindUserInput): boolean | Promise<boolean>;
}

export class UserEdge {
    node: User;
    cursor: string;
}

export class UsersConnection {
    edges: UserEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}

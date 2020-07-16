
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

export interface PaginationInput {
    first?: number;
    last?: number;
    after?: string;
    before?: string;
    cursorAt?: PaginationCursorAt;
}

export interface FindUserInput {
    _id?: string;
    email?: string;
}

export interface CreateUserInput {
    email: string;
    password: string;
    name: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface UserEdge {
    node: User;
    cursor: string;
}

export interface PageInfo {
    hasNextPage: boolean;
    endCursor?: string;
    hasPreviousPage: boolean;
    startCursor?: string;
}

export interface UsersConnection {
    edges?: UserEdge[];
    pageInfo?: PageInfo;
    totalCount?: number;
}

export interface IQuery {
    user(input?: FindUserInput): User | Promise<User>;
    users(pagination?: PaginationInput): UsersConnection | Promise<UsersConnection>;
}

export interface IMutation {
    createUser(input: CreateUserInput): User | Promise<User>;
}

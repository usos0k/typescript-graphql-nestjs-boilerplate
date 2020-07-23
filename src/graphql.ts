
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UsersPaginationCursorAt {
    ID = "ID",
    CREATED_AT = "CREATED_AT"
}

export interface PaginationInput {
    first?: number;
    last?: number;
    after?: string;
    before?: string;
}

export interface FindUserInput {
    id?: string;
    email?: string;
}

export interface CreateUserInput {
    email: string;
    password: string;
    name: string;
}

export interface PageInfo {
    hasNextPage: boolean;
    endCursor?: string;
    hasPreviousPage: boolean;
    startCursor?: string;
}

export interface Auth {
    user?: User;
    token?: string;
}

export interface IQuery {
    whoami(): User | Promise<User>;
    user(input?: FindUserInput): User | Promise<User>;
    users(pagination?: PaginationInput, filters?: UsersPaginationCursorAt): UsersConnection | Promise<UsersConnection>;
}

export interface IMutation {
    login(email?: string, password?: string): Auth | Promise<Auth>;
    createUser(input: CreateUserInput): User | Promise<User>;
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

export interface UsersConnection {
    edges?: UserEdge[];
    pageInfo?: PageInfo;
    totalCount?: number;
}

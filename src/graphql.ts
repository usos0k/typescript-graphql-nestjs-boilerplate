
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    email: string;
    password: string;
    name: string;
}

export interface UpdateUserInput {
    name?: string;
}

export interface User {
    _id: string;
    email: string;
    name: string;
}

export interface IQuery {
    user(_id: string): User | Promise<User>;
    users(offset?: number, limit?: number): User[] | Promise<User[]>;
}

export interface IMutation {
    createUser(input: CreateUserInput): User | Promise<User>;
    updateUser(_id: string, input?: UpdateUserInput): boolean | Promise<boolean>;
    deleteUser(_id: string): boolean | Promise<boolean>;
}

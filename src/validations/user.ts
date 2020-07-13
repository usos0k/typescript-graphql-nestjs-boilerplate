import { ValidationSchema, registerSchema } from 'class-validator';

const email = [
  {
    type: 'isEmail',
    message: 'email is invalid.',
  },
];

const password = [
  {
    type: 'minLength',
    constraints: [1],
    message: 'password must be between 1 and 12 characters.',
  },
  {
    type: 'maxLength',
    constraints: [12],
    message: 'password must be between 1 and 12 characters.',
  },
];

export const createUserValidation: ValidationSchema = {
  name: 'createUserRegister', // this is required, and must be unique
  properties: {
    email,
    password,
  },
};

registerSchema(createUserValidation);
// TODO: Use this schema to validate

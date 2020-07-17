import { verifyPassword } from '@/utils';
import {
  ValidationOptions,
  buildMessage,
  registerDecorator,
} from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string): void => {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
          return verifyPassword(value);
        },
        defaultMessage: buildMessage(() => 'Invalid password format'),
      },
    });
  };
}

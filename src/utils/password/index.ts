import { BCRYPT_SALT } from '@/environments';
import { compare, hash } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => await hash(password, BCRYPT_SALT);

export const comparePassword = async (password: string, hash: string): Promise<boolean> =>
  await compare(password, hash);

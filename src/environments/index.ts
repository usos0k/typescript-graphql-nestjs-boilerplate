import dotenv from 'dotenv';

dotenv.config();

// environment
export const NODE_ENV: string = process.env.NODE_ENV || 'development';

// application
export const DOMAIN: string = process.env.DOMAIN || 'localhost';
export const PORT: number = +`${process.env.PORT}` || 3000;

// mongodb
export const MONGO_URL: string = process.env.MONGO_URL || 'mongodb://localhost:27017';
export const MONGO_DB: string = process.env.MONGO_DB || '';

// jsonwebtoken
export const ISSUER: string = process.env.ISSUER || 'SKELETON';
export const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'access-token';
export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || 'access-token-key';
export const EMAIL_TOKEN: string = process.env.EMAIL_TOKEN || 'email-token';
export const EMAIL_TOKEN_SECRET: string = process.env.EMAIL_TOKEN_SECRET || 'email-token-key';
export const RESETPASS_TOKEN: string = process.env.RESETPASS_TOKEN || 'resetpass-token';
export const RESETPASS_TOKEN_SECRET: string = process.env.RESETPASS_TOKEN_SECRET || 'resetpass-token-key';

// bcrypt
export const BCRYPT_SALT: number = +`${process.env.BCRYPT_SALT}` || 10;

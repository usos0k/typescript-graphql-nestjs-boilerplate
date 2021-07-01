import dotenv from 'dotenv';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

const env = {
  development: 'dev',
  production: 'prod',
  local: 'local',
  test: 'test',
}[process.env.NODE_ENV || 'local'];

dotenv.config({ path: `.env.${env}` });

// environment
export const NODE_ENV: string = process.env.NODE_ENV || 'development';

// author
export const AUTHOR: string = process.env.AUTHOR || '';

// application
export const HTTP: string = process.env.HTTP || 'http';
export const GRAPHQL_DEPTH_LIMIT: number =
  +process.env.GRAPHQL_DEPTH_LIMIT || 10;
export const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || '#87e8de';
export const DOMAIN: string = process.env.DOMAIN || 'localhost';
export const PORT: number = +process.env.PORT || 3000;
export const END_POINT: string = process.env.END_POINT || 'graphql';
export const FE_URL: string = process.env.FE_URL || 'xxx';

export const RATE_LIMIT_MAX: number = +`${process.env.RATE_LIMIT_MAX}` || 10000;

// DB
type DB_TYPE = 'mysql' | 'mongodb';
export const DB_TYPE: DB_TYPE = <DB_TYPE>process.env.DB_TYPE || 'mysql';
export const DB_HOST: string = process.env.DB_HOST || 'localhost';
export const DB_PORT: number = +`${process.env.DB_PORT}` || 3306;
export const DB_NAME: string = process.env.DB_NAME || '';
export const DB_USERNAME: string = process.env.DB_USERNAME || '';
export const DB_PASSWORD: string = process.env.DB_PASSWORD || '';

// jsonwebtoken
export const ISSUER: string = process.env.ISSUER || 'SKELETON';
export const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'access-token';
export const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || 'access-token-key';
export const EMAIL_TOKEN: string = process.env.EMAIL_TOKEN || 'email-token';
export const EMAIL_TOKEN_SECRET: string =
  process.env.EMAIL_TOKEN_SECRET || 'email-token-key';
export const RESETPASS_TOKEN: string =
  process.env.RESETPASS_TOKEN || 'resetpass-token';
export const RESETPASS_TOKEN_SECRET: string =
  process.env.RESETPASS_TOKEN_SECRET || 'resetpass-token-key';

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
export const AWS_REGION = process.env.AWS_REGION || '';
export const AWS_BUCKET = process.env.AWS_BUCKET || '';

// Query
export const MAX_QUERY_SIZE = 10;

// bcrypt
export const BCRYPT_SALT: number = +`${process.env.BCRYPT_SALT}` || 10;

// ETC
export const LOG_PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || '#87e8de';

// nodemailer
export const NODEMAILER_USER: string = process.env.NODEMAILER_USER || 'xxx';
export const NODEMAILER_PASS: string = process.env.NODEMAILER_PASS || 'xxx';

// Client
export const CLIENT_HTTP: string = process.env.CLIENT_HTTP || 'http';
export const CLIENT_URL: string = process.env.CLIENT_URL || 'localhost';
export const CLIENT_PORT: string = process.env.CLIENT_PORT || '3000';
export const CLIENT_WHOLESALER_HTTP: string =
  process.env.CLIENT_WHOLESALER_HTTP || 'http';
export const CLIENT_WHOLESALER_URL: string =
  process.env.CLIENT_WHOLESALER_URL || 'localhost';
export const CLIENT_WHOLESALER_PORT: string =
  process.env.CLIENT_WHOLESALER_PORT || '3000';

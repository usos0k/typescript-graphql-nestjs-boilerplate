import {
  ACCESS_TOKEN_SECRET,
  EMAIL_TOKEN_SECRET,
  ISSUER,
  RESETPASS_TOKEN_SECRET,
} from '@/environments';
import { sign, verify } from 'jsonwebtoken';

export interface Token {
  id: string;
  tokenType: string;
}

type TokenType = 'accessToken' | 'emailToken' | 'resetPassToken';

const common = {
  accessToken: {
    privateKey: ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: '7d',
    },
  },
  emailToken: {
    privateKey: EMAIL_TOKEN_SECRET,
    signOptions: {
      expiresIn: '30m',
    },
  },
  resetPassToken: {
    privateKey: RESETPASS_TOKEN_SECRET,
    signOptions: {
      expiresIn: '30m',
    },
  },
};

export const generateToken = ({
  id,
  type,
}: {
  id: string;
  type: TokenType;
}): string =>
  sign({ id, type }, common[type].privateKey, {
    issuer: ISSUER,
    expiresIn: common[type].signOptions.expiresIn,
  });

export const verifyToken = ({
  token,
  type,
}: {
  token: string;
  type: TokenType;
}): Token => verify(token, common[type].privateKey) as Token;

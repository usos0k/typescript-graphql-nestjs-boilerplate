import {
  ACCESS_TOKEN_SECRET,
  EMAIL_TOKEN_SECRET,
  ISSUER,
  RESETPASS_TOKEN_SECRET,
} from '@/environments';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
import { sign, verify } from 'jsonwebtoken';
import { getMongoRepository } from 'typeorm';

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
  user,
  type,
}: {
  user: UserEntity;
  type: TokenType;
}): Promise<string> =>
  sign({ _id: user.id }, common[type].privateKey, {
    issuer: ISSUER,
    expiresIn: common[type].signOptions.expiresIn,
  });

export const verifyToken = async ({
  token,
  type,
}: {
  token: string;
  type: TokenType;
}): Promise<UserEntity> => {
  let user;

  // Get user from database
  await verify(token, common[type].privateKey, async (err, data) => {
    if (err) {
      throw new AuthenticationError('Authentication token is invalid.');
    }

    user = await getMongoRepository(UserEntity).findOne({ id: data.id });
  });

  if (type === 'emailToken') {
    return user;
  }

  if (user && !user.isVerified) {
    throw new ForbiddenError('Please verify your email.');
  }

  return user;
};

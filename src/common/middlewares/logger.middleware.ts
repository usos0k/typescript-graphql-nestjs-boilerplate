import { Logger } from '@nestjs/common';

export const LoggerMiddleware = (req, _res, next): void => {
  Logger.debug(
    `${
      req.headers['user-agent']
        ? req.headers['user-agent'].split(') ')[0]
        : req.headers
    }`,
  );
  next();
};

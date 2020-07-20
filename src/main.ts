import 'reflect-metadata';

import { AppModule } from '@/app.module';
import {
  ErrorsInterceptor,
  LoggerMiddleware,
  LoggingInterceptor,
  TimeoutInterceptor,
} from '@/common';
import { PORT, RATE_LIMIT_MAX } from '@/environments';
import { cron } from '@/utils';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { getConnection } from 'typeorm';

async function bootstrap() {
  try {
    // Create App
    const app = await NestFactory.create(AppModule, {
      // httpsOptions: {
      //   key: fs.readFileSync('server.key'),
      //   cert: fs.readFileSync('server.cert'),
      // }
    });

    // Connect Database
    const connection = getConnection('default');
    const { isConnected } = connection;
    isConnected
      ? Logger.log('Database connected', 'TypeORM', false)
      : Logger.error('Database connect error', '', 'TypeORM', false);

    //  Tasks
    cron();

    // Middlewares
    app.use(compression());
    app.use(helmet());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
      }),
    );
    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60, // 1 hour
        max: RATE_LIMIT_MAX,
        message:
          'Too many request created from this IP, please try again later',
      }),
    );
    app.use(LoggerMiddleware);

    // Interceptors
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalInterceptors(new ErrorsInterceptor());
    app.useGlobalInterceptors(new TimeoutInterceptor());

    // Global Nest Setup
    app.useGlobalPipes(new ValidationPipe());
    app.enableShutdownHooks();

    // Limit request size
    app.use('*', (req, _res, next) => {
      const query = req.query.query || req.body.query || '';
      if (query.length > 2000) {
        throw new Error('Too large query');
      }
      next();
    });

    await app.listen(PORT);
    Logger.log(`Server is listening on port ${PORT}`);
  } catch (error) {
    Logger.error(`Error starting server, ${error}`);
    process.exit();
  }
}
bootstrap();

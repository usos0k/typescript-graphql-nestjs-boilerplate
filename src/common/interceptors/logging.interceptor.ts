import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (req) {
      const { method, url } = req;

      return next.handle().pipe(
        tap(() => {
          Logger.log(`${method} ${url}`, context.getClass().name);
        }),
      );
    } else {
      const method = context.getArgs()[2].req.method || null;
      const url = context.getArgs()[2].req.url || null;
      const operation = context.getArgs()[3].operation.operation || null;
      const fieldName = context.getArgs()[3].fieldName || null;

      return next.handle().pipe(
        tap(() => {
          Logger.log(`${method} ${url} ${operation} ${fieldName}`);
        }),
      );
    }
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FastifyReply } from 'fastify';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      return this.logHttpCall(context, next);
    }
  }

  private logHttpCall(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const reply: FastifyReply = context.switchToHttp().getResponse();
    const userAgent = request.headers['user-agent'] || '';
    const { ip, method, url, user } = request;
    const userId = user?.userId;

    this.logger.log(
      `${method} ${url} ${userId} ${userAgent} ${ip}: ${
        context.getClass().name
      } ${context.getHandler().name}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const { statusCode } = reply;
        const contentLength = reply.getHeader('content-length');

        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength}: ${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }
}

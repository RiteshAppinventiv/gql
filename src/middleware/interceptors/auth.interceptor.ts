import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization; //Extract the token from the incoming request
    return next.handle().pipe(
      tap(() => {
        if (token) {
          context.switchToHttp().getResponse().headers['Authorization'] = `Bearer ${token}`;
        }
      }),
    );
  }
}


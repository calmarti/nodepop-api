import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseOrNotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (!response) {
          const [req] = context.getArgs();
          throw new NotFoundException(
            `Cannot ${req.method} ${req.url}`,
            'Not found',
          );
        }
        return response;
      }),
    );
  }
}

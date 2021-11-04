import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const mapAdvert = (host: string) => ({ photo, ...advert }) => ({
  ...advert,
  photo: photo && `http://${host}${photo}`,
});

@Injectable()
export class PhotoUrlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const [req] = context.getArgs();
        const mapAdvertWithHost = mapAdvert(req.headers.host);
        if (response instanceof Array) {
          return response.map(mapAdvertWithHost);
        }
        return mapAdvertWithHost(response);
      }),
    );
  }
}

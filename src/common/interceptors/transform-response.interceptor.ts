import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaginatedResult } from '../data-access/base-repository';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (response == null) {
          return {
            data: [],
          };
        }

        if (response instanceof PaginatedResult) {
          return {
            data: response.data,
            meta: {
              totalCount: response.totalCount,
              page: response.page,
              limit: response.limit,
              pageCount: response.pageCount,
            },
          };
        }

        return {
          data: response,
        };
      }),
    );
  }
}

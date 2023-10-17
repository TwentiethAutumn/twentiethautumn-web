import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
class PageLoadTime implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const now = Date.now();

        return next.handle().pipe(
            map((data) => {
                return { ...data, loadTime: Date.now() - now };
            }),
        );
    }
}

export { PageLoadTime };
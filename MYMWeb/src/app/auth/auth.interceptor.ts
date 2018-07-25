import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LoaderService } from '../shared/loader.service';
import { NotifyService } from '../shared/notify.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private inj: Injector,
        private loader: LoaderService,
        private notify: NotifyService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loader.show();
        const authService = this.inj.get(AuthService);
        const token = authService.getToken();
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(req).pipe(
            map(event => {
                console.log('success');
                return event;
            }),
            catchError(error => {
                console.log('error Catched');
                return throwError(error);
            }),
            finalize(() => {
                console.log('finalize');
                this.loader.hide();
            })
        );
    }
}

export let AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};


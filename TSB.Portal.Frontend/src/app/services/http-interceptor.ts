import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { timeout, catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LayoutService } from './layout.service';

@Injectable()
export class HttpInterceptorImpl implements HttpInterceptor {

	private timeOutMs: number = 10000;

	constructor(public layoutService: LayoutService) {}
	
	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {		
        this.layoutService.showLoader();
        return next.handle(req).pipe(
			timeout(this.timeOutMs),
			catchError((e) => throwError(e)),
            finalize(() => this.layoutService.hideLoader())
        );
    }
}

export const HttpInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: HttpInterceptorImpl,
	multi: true
};

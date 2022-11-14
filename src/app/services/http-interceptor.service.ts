import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { timeout, catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LayoutService } from './layout.service';
import { MessageService } from './message.service';

@Injectable()
class HttpInterceptorService implements HttpInterceptor {

	private timeOutMs: number = 20000;

	constructor(public layoutService: LayoutService, public messageService: MessageService) {}
	
	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (req.url.includes('tsb-portal.herokuapp.com') || req.url.includes('localhost')) {
			this.layoutService.showLoader(req.headers.get('show-loader').toLowerCase() == "true");
			return next.handle(req).pipe(
				timeout(this.timeOutMs),
				catchError((e) => {
					this.messageService.handle(e)
					return throwError(e);
				} ),
				finalize(() => this.layoutService.hideLoader())
			);
		} else {
			return next.handle(req);
		}
    }
}

export const HttpInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: HttpInterceptorService,
	multi: true
};

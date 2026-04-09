import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { isBackendUrl } from '../auth/auth-api-base';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    const request = token && isBackendUrl(req.url)
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          }
        })
      : req;

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && isBackendUrl(req.url)) {
          this.authService.clearSessionState();
        }

        return throwError(() => error);
      })
    );
  }
}

import { Injectable, inject } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private toastr = inject(ToastrService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Ocurrió un error inesperado.';

        if (error.error instanceof ErrorEvent) {
          // Error del cliente
          message = `Error de red: ${error.error.message}`;
        } else {
          // Error del servidor
          message = error.error?.message || `Error ${error.status}: ${error.statusText}`;
        }

        this.toastr.error(message, 'Error');
        console.error('Intercepted error:', error);
        return throwError(() => new Error(message));
      })
    );
  }
}

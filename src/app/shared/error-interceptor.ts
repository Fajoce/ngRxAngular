import { Injectable, inject } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
private toastr = inject(ToastrService);
  private snackBar = inject(MatSnackBar);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Ocurrió un error inesperado.';

        if (error.error instanceof ErrorEvent) {
          // Error del cliente o red
          message = `Error de red: ${error.error.message}`;
        } else {
          // Error del backend
          message = error.error?.message || `Error ${error.status}: ${error.statusText}`;
        }

        // Mostrar snackbar y toastr
        this.snackBar.open(message, 'Cerrar', { duration: 4000 });
        this.toastr.error(message, 'Error');

        console.error('Intercepted error:', error);
        return throwError(() => new Error(message));
      })
    );
  }
}

import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, Observable, of, throwError} from 'rxjs';
import {MessageService} from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<never> => {
      let errorMessage: string = 'An unexpected error occurred.';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        errorMessage = `Server Error (Code: ${error.status}): ${error.message}`;
      }

      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 2000,
      });

      console.error('HTTP Error:', errorMessage);
      return of();
    }),
  );
};

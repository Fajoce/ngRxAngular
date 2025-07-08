import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InvoiceServiceService } from '../../services/invoice-service.service';
import * as InvoiceActions from '../../store/invoice/invoice-action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InvoiceEffects {
  private actions$ = inject(Actions);
  private invoiceService = inject(InvoiceServiceService);
  private toastr = inject(ToastrService);

  createInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.createInvoice),
      mergeMap(action =>
        this.invoiceService.createInvoice(action.invoice).pipe(
          map(response => {
            this.toastr.success('Factura creada exitosamente', 'Éxito');
            return InvoiceActions.createInvoiceSuccess({ response });
          }),
          catchError(error =>
            of(InvoiceActions.createInvoiceFailure({ error: error.message }))
          )
        )
      )
    )
  );
}

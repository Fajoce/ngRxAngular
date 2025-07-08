import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from '../../store/invoice/invoice-action';
import { ResponseInvoice } from '../../models/response-invoice';

export interface InvoiceState {

  response: ResponseInvoice | null;
  error: string | null;
}

export const initialState: InvoiceState = {
  response: null,
  error: null,
};

export const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.createInvoiceSuccess, (state, { response }) => ({
    ...state,
    response,
    error: null,
  })),
  on(InvoiceActions.createInvoiceFailure, (state, { error }) => ({
    ...state,
    error,
    })))
    // 👇 Esto es lo que registras en app.config.ts
import { createFeature } from '@ngrx/store';

export const invoiceFeature = createFeature({
  name: 'invoice',
  reducer: invoiceReducer,
});


  

import { createAction, props } from '@ngrx/store';
import { ResponseInvoice } from '../../models/response-invoice';
import { CreateInvoiceRequest } from '../../models/CreateInvoiceRequest';

export const createInvoice = createAction(
  '[Invoice] Create Invoice',
  props<{ invoice: CreateInvoiceRequest }>()
);

export const createInvoiceSuccess = createAction(
  '[Invoice] Create Invoice Success',
  props<{ response: ResponseInvoice }>()
);

export const createInvoiceFailure = createAction(
  '[Invoice] Create Invoice Failure',
  props<{ error: string }>()
);



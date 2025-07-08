import { CreateDetailsInvoiceRequest } from "./create-details-invoice-request";

export interface CreateInvoiceRequest  {
  id?: number;
  saleDate: string; // ISO string (e.g. "2025-07-08T14:00:00Z")
  clientsId: number;
  details: CreateDetailsInvoiceRequest[];
  total: number;
}

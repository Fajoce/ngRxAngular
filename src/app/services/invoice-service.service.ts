import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateDetailsInvoiceRequest } from '../models/create-details-invoice-request';
import { Observable, throwError } from 'rxjs';
import { ResponseProduct } from '../models/response-product';
import { CreateInvoiceRequest } from '../models/CreateInvoiceRequest';
import { ResponseInvoice } from '../models/response-invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {
   private apiUrl = 'https://localhost:7201/invoice';

  constructor(private http: HttpClient) {}

  createInvoice(invoice: CreateInvoiceRequest): Observable<ResponseInvoice> {
    return this.http.post<ResponseInvoice>(`${this.apiUrl}/create`, invoice);
  }
}

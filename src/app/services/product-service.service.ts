import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, throwError } from 'rxjs';
import { ResponseProduct } from '../models/response-product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiUrl = 'https://localhost:7201/product';

  constructor(private http: HttpClient) { }

   getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+'/all');
  }

   getById(id: number): Observable<Product> {   
    return this.http.get<Product>(`${this.apiUrl}/single/${id}`);
  }

  create(prod: Product): Observable<ResponseProduct> {
    return this.http.post<ResponseProduct>(this.apiUrl+'/create', prod);
  }

  update(prod: Product): Observable<ResponseProduct> {
    return this.http.put<ResponseProduct>(`${this.apiUrl}/update/${prod.id}`, prod);
  }

  delete(id: number): Observable<ResponseProduct> {
    return this.http.delete<ResponseProduct>(`${this.apiUrl}/delete/${id}`);
  }
}

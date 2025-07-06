import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { ResponseCategory } from '../models/response-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
 private apiUrl = 'https://localhost:7201/category';

  constructor(private http: HttpClient) { }

   getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl+'/all');
  }

   getById(id: number): Observable<Category> {   
    return this.http.get<Category>(`${this.apiUrl}/single/${id}`);
  }

  create(category: Category): Observable<ResponseCategory> {
    return this.http.post<ResponseCategory>(this.apiUrl+'/create', category);
  }

  update(category: Category): Observable<ResponseCategory> {
    return this.http.put<ResponseCategory>(`${this.apiUrl}/update/${category.id}`, category);
  }

  delete(id: number): Observable<ResponseCategory> {
    return this.http.delete<ResponseCategory>(`${this.apiUrl}/delete/${id}`);
  }
}

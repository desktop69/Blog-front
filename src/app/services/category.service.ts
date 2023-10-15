import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:3000/category';
  constructor(private http: HttpClient) { }
  add(data: Category): Observable<Category> {
   // console.log("from services name say hi :)", data.name)
    return this.http.post<Category>(this.apiUrl, data)
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getById(Id: string): Observable<Category> {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.get<Category>(url);
  }

  update(Id: string, categoryData: Category): Observable<Category> {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.put<Category>(url, categoryData);
  }

  delete(Id: string): Observable<any> {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.delete(url);
  }


}
